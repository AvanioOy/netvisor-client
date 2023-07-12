import 'mocha';
import * as chai from 'chai';
import {ApiProvider, resources} from '../../src';
import chaiAsPromised from 'chai-as-promised';
import dotenv from 'dotenv';
import {EnviromentConfigProvider} from '../../src/api';
import { ISalesInvoice } from '../../src/resources/salesinvoice/postSalesInvoice/types';

dotenv.config();

const expect = chai.expect;
chai.use(chaiAsPromised);

const conf = new EnviromentConfigProvider();
const api = new ApiProvider(conf);

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
					dimension: [
						{
							dimensionName: 'Test',
							dimensionItem: '1',
						},
					],
				},
			},
		},
	],
};

describe('api tests', () => {
	it('it should get a customer list', async () => {
		const root = await resources.customer.getCustomerList(api);
		expect(root?.customers).to.be.an('array');
		expect(root?.customers).to.have.length.greaterThan(0);
	});
	it('should be able to post a customer and edit', async () => {
		const id = await resources.customer.postCustomer(
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
		expect(id).to.be.a('number');

		const edit = await resources.customer.postCustomer(
			api,
			{
				customerBaseInformation: {
					name: 'Test 2',
				},
			},
			{
				method: 'edit',
				id: id as number,
			});
		expect(edit).to.be.equal(null);
	});
	it('should be able to get a customer', async () => {
		const id = await resources.customer.postCustomer(
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
		if(id == null){
			throw new Error("Failed to create customer");
		}
		const root = await resources.customer.getCustomer(api, {
			id,
		});
		expect(root?.customer).to.be.an('object');
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

	it("should be able to get single purchaseinvoice", async() => {
		const purchaseInvoices = await resources.purchaseinvoice.getPurchaseInvoiceBatch(api, {
			netvisorKeyList: '2',
			version: '2',
		});
		expect(purchaseInvoices?.purchaseInvoices).to.be.an('array');
	})

	it('should be able to post a salesinvoice', async () => {
		await resources.salesinvoice.postSalesInvoice(api, salesInvoice, {
			method: 'add',
		});
	});
	it('should be able to get a salesinvoicelist', async () => {
		const salesInvoice = await resources.salesinvoice.getSalesInvoiceList(api);
		expect(salesInvoice).to.be.an('object');
		expect(salesInvoice?.salesInvoices).to.be.an('array');
		expect(salesInvoice?.salesInvoices).to.have.length.greaterThan(0);
	});
	it('should be able to get a salesinvoice batch', async () => {
		const createdId = await resources.salesinvoice.postSalesInvoice(api, salesInvoice, {
			method: 'add',
		});
		if(createdId == null){
			throw new Error('failed to post sales invoice')
		}
		await resources.salesinvoice.postSalesInvoice(api, salesInvoice, {
			method: 'add',
		});
		const salesInvoices = await resources.salesinvoice.getSalesInvoiceBatch(api, {
			netvisorKeyList: [createdId, createdId+1].join(","),
		});
		expect(salesInvoices).to.be.an('object');
		expect(salesInvoices?.salesInvoices).to.be.an('array');
		expect(salesInvoices?.salesInvoices).to.have.lengthOf(2);
	});
	it('should be able to a single invoice from salesinvoice batch', async() => {
		const createdId = await resources.salesinvoice.postSalesInvoice(api, salesInvoice, {
			method: 'add',
		});
		if(createdId == null){
			throw new Error('Failed to post sales invoice');
		}
		
		const salesInvoices = await resources.salesinvoice.getSalesInvoiceBatch(api, {
			netvisorKeyList: createdId.toString(),
		});
		expect(salesInvoices).to.be.an('object');
		expect(salesInvoices?.salesInvoices).to.be.an('array');
		expect(salesInvoices?.salesInvoices).to.have.lengthOf(1);
	})
});
