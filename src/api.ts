import 'cross-fetch/polyfill';
import crypto from 'crypto';
import {parseResponseStatus} from './utils';

export type NetvisorRequest<T, U> = {
	path: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	parse?: (body: string) => Promise<T>;
	params?: U | undefined;
	body?: string;
};

export const netvisorEnvironment = {
	isv: 'https://isvapi.netvisor.fi',
} as const;

export interface IConfig {
	client: string;
	userKey: string;
	partnerKey: string;
	language: string;
	organisationId: string;
	privateKey: string;
	partnerPrivateKey: string;
	env: keyof typeof netvisorEnvironment;
}

export interface IConfigProvider {
	getConfig: Promise<IConfig> | IConfig | (() => Promise<IConfig>);
}

export class EnviromentConfigProvider implements IConfigProvider {
	getConfig: IConfig;
	constructor() {
		if (process.env.NETVISOR_ENV == null || Object.keys(netvisorEnvironment).includes(process.env.NETVISOR_ENV) === false) {
			throw new Error(
				`NETVISOR_ENV is not set or is invalid: It is ${process.env.NETVISOR_ENV} but should be one of ${Object.keys(netvisorEnvironment).join(', ')}`,
			);
		}
		if (process.env.NETVISOR_CLIENT == null) {
			console.warn('NETVISOR_CLIENT is not set, using default "default"');
		}

		const fieldsToCheck = [
			'NETVISOR_USER_KEY',
			'NETVISOR_PARTNER_KEY',
			'NETVISOR_LANGUAGE',
			'NETVISOR_ORGANISATION_ID',
			'NETVISOR_PRIVATE_KEY',
			'NETVISOR_PARTNER_PRIVATE_KEY',
		];
		for (const field of fieldsToCheck) {
			if (process.env[field] == null) {
				throw new Error(`${field} is not set`);
			}
			console.log(process.env[field]);
		}
		this.getConfig = {
			client: process.env.NETVISOR_CLIENT ?? 'default',
			env: process.env.NETVISOR_ENV as keyof typeof netvisorEnvironment,
			language: process.env.NETVISOR_LANGUAGE ?? '',
			organisationId: process.env.NETVISOR_ORGANISATION_ID ?? '',
			partnerKey: process.env.NETVISOR_PARTNER_KEY ?? '',
			partnerPrivateKey: process.env.NETVISOR_PARTNER_PRIVATE_KEY ?? '',
			privateKey: process.env.NETVISOR_PRIVATE_KEY ?? '',
			userKey: process.env.NETVISOR_USER_KEY ?? '',
		};
	}
}

export interface IApiProvider {
	handleRequest(url: string, params: Record<string, string>, method: string, body: string): Promise<Request>;
	request<T, U>(request: NetvisorRequest<T, U>): Promise<T | null>;
}

export class ApiProvider implements IApiProvider {
	private configProvider = {} as IConfigProvider;
	constructor(configProvider: IConfigProvider | IConfig) {
		if ('getConfig' in configProvider) {
			this.configProvider = configProvider;
		} else {
			this.configProvider = {
				getConfig: configProvider,
			};
		}
	}

	public async getConfig(): Promise<IConfig> {
		return await (typeof this.configProvider.getConfig === 'function' ? this.configProvider.getConfig() : this.configProvider.getConfig);
	}

	public async request<T, U>(request: NetvisorRequest<T, U>): Promise<T | null> {
		const config = await this.getConfig();
		const url = `${netvisorEnvironment[config.env]}${request.path}`;
		const withAuth = await this.handleRequest(url, request.params ?? {}, request.method, request.body || '');
		const response = await fetch(withAuth);
		if (!response.ok) throw new Error(response.statusText);
		const xml = await response.text();
		// parse status
		const responseStatus = parseResponseStatus(xml);
		if (responseStatus.status === 'FAILED') {
			throw new Error(`Netvisor request failed: status ${responseStatus.status} with message ${xml}`);
		}
		return request.parse ? request.parse(xml) : null;
	}

	public async handleRequest(url: string, params: Record<string, string>, method: string, body: string): Promise<Request> {
		const config = await this.getConfig();
		const transId = `${Math.random() * 100000000000000000}`;
		const timestamp = new Date().toISOString();

		if (params && Object.keys(params).length > 0) {
			const paramsString = Object.keys(params)
				.map((key) => `${key}=${params[key]}`)
				.join('&');
			url += `?${paramsString}`;
		}
		const request = new Request(url, {
			method,
			body: method === 'POST' || method === 'PUT' ? body : undefined,
		});

		request.headers.set('X-Netvisor-Authentication-Sender', config.client);
		request.headers.set('X-Netvisor-Authentication-CustomerId', config.userKey);
		request.headers.set('X-Netvisor-Authentication-PartnerId', config.partnerKey);
		request.headers.set('X-Netvisor-Interface-Language', config.language);
		request.headers.set('X-Netvisor-Organisation-ID', config.organisationId);
		request.headers.set('X-Netvisor-Authentication-Timestamp', timestamp);
		request.headers.set('X-Netvisor-Authentication-TransactionId', transId);
		await this.calculateMac(request, transId, timestamp);
		return request;
	}

	private async calculateMac(request: Request, transId: string, timestamp: string) {
		const config = await this.getConfig();
		const macString = `${request.url}&${config.client}&${config.userKey}&${timestamp}&${config.language}&${config.organisationId}&${transId}&${config.privateKey}&${config.partnerPrivateKey}`;
		const mac = crypto.createHash('sha256').update(macString).digest('hex');
		request.headers.set('X-Netvisor-Authentication-MAC', mac);
		request.headers.set('X-Netvisor-Authentication-MACHashCalculationAlgorithm', 'SHA256');
	}
}
