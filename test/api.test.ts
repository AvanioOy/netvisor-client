import 'mocha';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {ApiProvider, resources} from '../src';
import dotenv from 'dotenv';
import {EnviromentConfigProvider} from '../src/api';

dotenv.config();

const expect = chai.expect;
chai.use(chaiAsPromised);

const conf = new EnviromentConfigProvider();
const api = new ApiProvider(conf);

describe('api tests', () => {
	it('it should get a customer list', async () => {
		const root = await resources.customer.getCustomerList(api);
		expect(root?.customers).to.be.an('array');
		expect(root?.customers).to.have.length.greaterThan(0);
	});
	it('should be able to post a customer', async () => {
		await resources.customer.postCustomer(
			api,
			{
				customerBaseInformation: {
					name: 'Test',
				},
			},
			{
				method: 'add',
			},
		);
		expect(1).to.equal(1);
	});
	it('should be able to get a purchaseorder list', async () => {
		const root = await resources.purchaseinvoice.getPurchaseOrderList(api);
		expect(root?.purchaseInvoices).to.be.an('array');
	});
	it('should get config from env', async () => {
		// set env variables
		process.env.NETVISOR_CLIENT = 'Test';
		process.env.NETVISOR_ENV = 'isv';
		process.env.NETVISOR_USER_KEY = 'userkey';
		process.env.NETVISOR_PARTNER_KEY = 'partnerkey';
		process.env.NETVISOR_LANGUAGE = 'FI';
		process.env.NETVISOR_ORGANISATION_ID = 'orgid';
		process.env.NETVISOR_PRIVATE_KEY = 'privatekey';
		process.env.NETVISOR_PARTNER_PRIVATE_KEY = 'partnerprivatekey';
		const conf = new EnviromentConfigProvider();

		const config = conf.getConfig;

		expect(config.client).to.equal('Test');
		expect(config.env).to.equal('isv');
		expect(config.userKey).to.equal('userkey');
		expect(config.partnerKey).to.equal('partnerkey');
		expect(config.language).to.equal('FI');
		expect(config.organisationId).to.equal('orgid');
		expect(config.privateKey).to.equal('privatekey');
		expect(config.partnerPrivateKey).to.equal('partnerprivatekey');
	});

	it('should allow config to be passed as object', async () => {
		const api = new ApiProvider({
			client: 'Test',
			env: 'isv',
			language: 'FI',
			organisationId: 'orgid',
			partnerKey: 'partnerkey',
			partnerPrivateKey: 'partnerprivatekey',
			privateKey: 'privatekey',
			userKey: 'userkey',
		});

		const config = await api.getConfig();

		expect(config.client).to.equal('Test');
		expect(config.env).to.equal('isv');
		expect(config.userKey).to.equal('userkey');
		expect(config.partnerKey).to.equal('partnerkey');
		expect(config.language).to.equal('FI');
		expect(config.organisationId).to.equal('orgid');
		expect(config.privateKey).to.equal('privatekey');
		expect(config.partnerPrivateKey).to.equal('partnerprivatekey');
	});
	it('should throw if netvisor env is not valid', async () => {
		const prev = process.env.NETVISOR_ENV;
		process.env.NETVISOR_ENV = 'invalid';
		expect(() => new EnviromentConfigProvider()).to.throw();
		process.env.NETVISOR_ENV = prev;
	});
	it('should throw if some env variables are missing', async () => {
		const prev = process.env.NETVISOR_ORGANISATION_ID;
		delete process.env.NETVISOR_ORGANISATION_ID;
		expect(() => new EnviromentConfigProvider()).to.throw();
		process.env.NETVISOR_ORGANISATION_ID = prev;
	});
	it('should set client to default if not set', async () => {
		delete process.env.NETVISOR_CLIENT;
		const conf = new EnviromentConfigProvider();
		const config = conf.getConfig;
		expect(config.client).to.equal('default');
	});
	it('should throw if request returns error', async () => {
		// mock fetch
		const prev = global.fetch;

		(global.fetch as any) = async () => {
			return {
				text: async () => {
					return '<?xml version="1.0" encoding="utf-8" standalone="yes"?>\r\n<Root>\r\n    <ResponseStatus>\r\n        <Status>FAILED</Status>\r\n        <Status>AUTHENTICATION_FAILED :: URI-metodi ei kelpaa, katso dokumentaatio. Käytä MAC-tiivisteen laskentaan merkkijonoa: https://isvapi.netvisor.fi/customerlist.nv&Demokäyttäjä Avanio&F2FD629D-CD04-4AF7-8F9B-4FE69CE6099C_31405&2023-06-05T13:12:06.378Z&FI&2729069-3&TRANSID57398077988731000&YOUR_PRIVATE_KEY_HERE :: F634424F4C3F10A28CEFB39AD20896F6E10CAD5F023FA4748469B70D37F8C00C</Status>\r\n        <TimeStamp>5.6.2023 16:12:09</TimeStamp>\r\n    </ResponseStatus>\r\n</Root>';
				},
				status: 200,
				ok: true,
			};
		};
		const api = new ApiProvider(new EnviromentConfigProvider());
		await expect(
			api.request({
				method: 'GET',
				path: '/customerlist.nv',
			}),
		).to.be.rejectedWith();
		global.fetch = prev;
	});
});
