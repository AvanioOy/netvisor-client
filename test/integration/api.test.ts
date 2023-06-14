import 'mocha';
import * as chai from 'chai';
import {ApiProvider, resources} from '../../src';
import chaiAsPromised from 'chai-as-promised';
import dotenv from 'dotenv';
import {EnviromentConfigProvider} from '../../src/api';

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
		const root = await resources.purchaseinvoice.getPurchaseInvoiceList(api);
		expect(root?.purchaseInvoices).to.be.an('array');
	});
	it('should be able to get a dimension list', async () => {
		const root = await resources.dimension.getDimensionList(api);
		expect(root?.dimensions).to.be.an('array');
	});
	it('should be able to post a dimension', async () => {
		await resources.dimension.postDimension(
			api,
			{
				name: 'Test',
				item: `${Math.random() * 100000000000000000}`,
			},
			{
				method: 'add',
			},
		);
		expect(1).to.equal(1);
	});
	it('should be able to a get a single purchaseinvoice', async () => {
		const purchaseInvoice = await resources.purchaseinvoice.getPurchaseInvoice(api, {
			netvisorKey: 2,
			version: '2',
		});

		expect(purchaseInvoice).to.be.an('object');
	});
	it('should be able to get multiple purchaseinvoices', async () => {
		const purchaseInvoices = await resources.purchaseinvoice.getPurchaseInvoiceBatch(api, {
			netvisorKeyList: '2,3',
			version: '2',
		})
		expect(purchaseInvoices?.purchaseInvoices).to.be.an('array');
	});
});
