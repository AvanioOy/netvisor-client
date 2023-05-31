import 'cross-fetch/polyfill';
import crypto from 'crypto';

export type NetvisorRequest<T, U> = {
	path: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	parse?: (response: Response) => Promise<T>;
	params?: U | undefined;
	body?: string;
};

export interface IConfig {
	client: string;
	userKey: string;
	partnerKey: string;
	language: string;
	organisationId: string;
	baseUrl: string;
	privateKey: string;
	partnerPrivateKey: string;
}

export interface IConfigProvider {
	getConfig: Promise<IConfig> | IConfig | (() => Promise<IConfig>);
}

export class ConfigProvider implements IConfigProvider {
	private config: IConfig;
	constructor(config: IConfig) {
		this.config = config;
	}

	getConfig = async () => this.config;
}

export interface IApiProvider {
	handleRequest(url: string, params: Record<string, string>, method: string, body: string): Promise<Request>;
	request<T, U>(request: NetvisorRequest<T, U>): Promise<T | null>;
}

export class ApiProvider implements IApiProvider {
	private configProvider = {} as IConfigProvider;
	private config = {} as IConfig;
	constructor(configProvider: IConfigProvider) {
		this.configProvider = configProvider;
	}

	public async request<T, U>(request: NetvisorRequest<T, U>): Promise<T | null> {
		await this.ensureConfig();
		const url = `${this.config.baseUrl}${request.path}`;
		const withAuth = await this.handleRequest(url, request.params ?? {}, request.method, request.body || '');

		const response = await fetch(withAuth);
		if (!response.ok) throw new Error(response.statusText);
		return request.parse ? request.parse(response) : null;
	}

	public async handleRequest(url: string, params: Record<string, string>, method: string, body: string): Promise<Request> {
		await this.ensureConfig();
		const transId = `TRANSID${Math.random() * 100000000000000000}`;
		const timestamp = new Date().toISOString();

		if (params) {
			const paramsString = Object.keys(params)
				.map((key) => `${key}=${params[key]}`)
				.join('&');
			url += `?${paramsString}`;
		}
		const request = new Request(url, {
			method,
			body,
		});

		request.headers.set('X-Netvisor-Application-Sender', this.config.client);
		request.headers.set('X-Netvisor-Authentication-CustomerId', this.config.userKey);
		request.headers.set('X-Netvisor-Partner-Id', this.config.partnerKey);
		request.headers.set('X-Netvisor-Language', this.config.language);
		request.headers.set('X-Netvisor-Organisation-ID', this.config.organisationId);
		request.headers.set('X-Netvisor-Authentication-Timestamp', timestamp);
		request.headers.set('X-Netvisor-Authentication-TransactionId', transId);
		await this.calculateMac(request, transId, timestamp);
		return request;
	}

	private async ensureConfig() {
		if (!this.config) {
			this.config = await (typeof this.configProvider.getConfig === 'function' ? this.configProvider.getConfig() : this.configProvider.getConfig);
		}
		if (!this.config) {
			throw new Error('No config found');
		}
	}

	private async calculateMac(request: Request, transId: string, timestamp: string) {
		await this.ensureConfig();
		const config = this.config;
		const macString = `${request.url}&${config.client}&${config.userKey}&${timestamp}&${config.language}&${transId}&${config.privateKey}&${config.partnerPrivateKey}`;
		const mac = crypto.createHash('sha256').update(macString).digest('hex');
		request.headers.set('X-Netvisor-Authentication-MAC', mac);
		request.headers.set('X-Netvisor-Partner-MACHashCalculationAlgorithm', 'SHA256');
	}
}
