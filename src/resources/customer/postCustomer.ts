import {build} from '../../buildXml';
import {IApiProvider} from '../../api';
import {insertedDocumentsParser} from '../../parse';

export interface Params {
	method: 'add' | 'edit';
	id?: number;
}

export interface IBaseInformation {
	externalIdentifier?: string;
	organizationUnitNumber?: number;
	name?: string;
	nameExtension?: string;
	streetAddress?: string;
	additionalAddressLine?: string;
	city?: string;
	postCode?: string;
	country?: string;
	countryCode?: string;
	phoneNumber?: string;
	faxNumber?: string;
	emailAddress?: string;
	homePageUri?: string;
	isActive?: boolean;
	isPrivateCustomer?: boolean;
	emailInvoicingAddress?: string;
}

export interface ICustomerFinvoiceDetails {
	finvoiceAddress: string;
	finvoiceRouterCode: string;
}

export interface ICustomerDeliveryDetails {
	deliveryName?: string;
	deliveryStreetAddress?: string;
	deliveryCity?: string;
	deliveryPostalNumber?: string;
	deliveryCountry?: string;
}

export interface ICustomerAdditionalInformation {
	comment?: string;
	customerAgreementIdentifier?: string;
	customerReferenceNumber?: number;
	invoicingLanguage?: 'FI' | 'SV' | 'EN';
	invoicePrintChannelFormat?: '1' | '2';
	yourDefaultReference?: string;
	defaultTextBeforeInvoiceLines?: string;
	defaultTextAfterInvoiceLines?: string;
	defaultPaymentTerm?: string;
	defaultSecondName?: string;
	paymentInterest?: number;
	balanceLimit?: number;
	receivablesManagementAutomationRule?: number;
	factoringAccount?: number;
	taxHandlingType?: string;
	defaultSalesPerson?: {
		salesPersonId?: number;
	};
}

export interface IDimension {
	dimensionName: string;
	dimensionItem: number;
}

export type ICustomer = {
	customerBaseInformation: IBaseInformation;
	customerFinvoiceDetails?: ICustomerFinvoiceDetails;
	customerDeliveryDetails?: ICustomerDeliveryDetails;
	customerAdditionalInformation?: ICustomerAdditionalInformation;
	customerDimensionDetails?: {
		dimension: IDimension;
	};
};

export default async function (api: IApiProvider, customer: ICustomer, params: Params) {
	return api.request({
		body: `<root><Customer>${build(customer)}</Customer></root>`,
		method: 'POST',
		params,
		parse: insertedDocumentsParser(),
		path: '/customer.nv',
	});
}
