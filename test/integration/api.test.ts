import 'mocha';
import * as chai from 'chai';
import {ApiProvider, resources} from '../../src';
import chaiAsPromised from 'chai-as-promised';
import dotenv from 'dotenv';
import {EnviromentConfigProvider} from '../../src/api';
import {ISalesInvoice} from '../../src/resources/salesinvoice/postSalesInvoice';

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
			netvisorKeyList: '2,3,5',
			version: '2',
		});
		expect(purchaseInvoices?.purchaseInvoices).to.be.an('array');
	});

	it('should be able to post a salesinvoice', async () => {
		const salesInvoice: ISalesInvoice = {
			salesInvoiceDate: {
				_value: '2023-05-23',
				_attributes: {
					format: 'ansi',
				},
			},
			salesInvoiceDueDate: {
				_value: '2023-06-06',
				_attributes: {
					format: 'ansi',
				},
			},
			salesInvoiceAmount: {
				_value: '0,00',
				_attributes: {
					iso4217currencyCode: 'EUR',
					currencyRate: '1,00',
				},
			},
			invoiceType: 'invoice',
			salesInvoiceStatus: {
				_value: 'unsent',
				_attributes: {
					type: 'netvisor',
				},
			},
			invoicingCustomeridentifier: {
				_value: '1',
				_attributes: {
					type: 'customer',
				},
			},
			invoiceLines: [
				{
					invoiceLine: {
						salesInvoiceProductLine: {
							productIdentifier: {
								_value: 'Testi',
								_attributes: {
									type: 'customer',
								},
							},
							productName: 'Testituote',
							productunitPrice: {
								_value: 20,
								_attributes: {
									type: 'net',
								},
							},
							productVatPercentage: {
								_value: 24,
								_attributes: {
									vatcode: 'KOMY',
								},
							},
							salesInvoiceProductLineQuantity: 5,
							salesInvoiceProductLineFreeText: 'vapaa txt',
							dimension: {
								dimensionName: 'Test',
								dimensionItem: 'test_1',
							},
						},
					},
				},
			],
		};
		await resources.salesinvoice.postSalesInvoice(api, salesInvoice, {
			method: 'add',
		});
	});
});
