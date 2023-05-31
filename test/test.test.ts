import 'mocha';
import * as chai from 'chai';
import {resources} from '../src';
import {ICustomer} from '../src/resources/customer/postCustomer';

const expect = chai.expect;

describe('index.ts', () => {
	it('should do something', async () => {
		const customer: ICustomer = {
			customerBaseInformation: {
				name: 'Test',
				organizationUnitNumber: 3,
				externalIdentifier: '123',
				internalIdentifier: '123',
				countryCode: 'FI',
				nameExtension: 'Test',
				streetAddress: 'Test',
				additionalAddressLine: 'Test',
				postalCode: '123',
				city: 'Test',
				country: 'Test',
				phoneNumber: '123',
				faxNumber: '123',
				emailAddress: 'Test',
				homePageUri: 'Test',
				isActive: true,
				isPrivateCustomer: true,
				emailInvoicingAddress: 'Test',
			},
			customerFinvoiceDetails: {
				finvoiceAddress: 'Test',
				finvoiceRouterCode: 'Test',
			},
			customerDeliveryDetails: {
				deliveryName: 'Test',
				deliveryStreetAddress: 'Test',
				deliveryCity: 'Test',
				deliveryCountry: 'Test',
				deliveryPostalNumber: 'Test',
			},
			customerAdditionalInformation: {
				comment: 'Test',
				customerAgreementIdentifier: 'Test',
				customerReferenceNumber: 3,
				invoicingLanguage: 'FI',
				invoicePrintChannelFormat: '1',
				yourDefaultReference: 'Test',
				defaultTextBeforeInvoiceLines: 'Test',
				defaultTextAfterInvoiceLines: 'Test',
				defaultPaymentTerm: 'Test',
				defaultSecondName: 'Test',
				paymentInterest: 3,
				balanceLimit: 3,
				receivablesManagementAutomationRule: 3,
				factoringAccount: 3,
				taxHandlingType: 'countrygroup',
				defaultSalesPerson: {
					salesPersonId: 3,
				},
			},
			customerDimensionDetails: {
				dimension: {
					dimensionName: 'Test',
					dimensionItem: 3,
				},
			},
		};
		await resources.customer.postCustomer(customer, {
			request: async (request: any) => {
				console.log(request);
				return null;
			},
			handleRequest: async () => new Request('idk'),
		});
		expect(true).to.be.equal(true);
	});
});
