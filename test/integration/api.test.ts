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
		const root = await resources.purchaseinvoice.getPurchaseOrderList(api);
		expect(root?.purchaseInvoices).to.be.an('array');
	});
});
