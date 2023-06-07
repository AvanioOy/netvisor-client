import {dateValue, directArraySchemaValue, integerValue, stringValue, XmlMappingSchema} from '@avanio/xml-mapper';
import {generalParser} from '../../parse';
import {IApiProvider} from '../../api';

export interface IParams {
	beginInvoiceDate?: string;
	endInvoiceDate?: string;
	invoiceNumber?: number;
	invoiceStatus?: 'Open' | 'Approved' | 'Accepted';
	lastModifiedStart?: string;
	lastModifiedEnd?: string;
	purchaseInvoiceBatchId?: number;
	paymentStatus?: 'paid' | 'unpaid';
}

export type IPurchaseInvoice = {
	netvisorKey: number;
	invoiceNumber: string;
	invoiceDate: Date;
	vendor: string;
	vendorOrganizationIdentifier: string;
	sum: number;
	payments: number;
	openSum: number;
	uri: string;
};

const purchaseInvoiceBuilder: XmlMappingSchema<IPurchaseInvoice> = {
	invoiceDate: {mapper: dateValue, required: true},
	invoiceNumber: {mapper: stringValue, required: true},
	netvisorKey: {mapper: integerValue, required: true},
	openSum: {mapper: integerValue, required: true},
	payments: {mapper: integerValue, required: true},
	sum: {mapper: integerValue, required: true},
	uri: {mapper: stringValue, required: true},
	vendor: {mapper: stringValue, required: true},
	vendorOrganizationIdentifier: {mapper: stringValue},
};

export type IPurchaseInvoiceRoot = {
	purchaseInvoices: IPurchaseInvoice[];
};

export const purchaseInvoiceListBuilder: XmlMappingSchema<IPurchaseInvoiceRoot> = {
	purchaseInvoices: {mapper: directArraySchemaValue('purchaseInvoiceList', purchaseInvoiceBuilder), required: true},
};

export default async function (api: IApiProvider, params: IParams | undefined = undefined) {
	return api.request({
		method: 'GET',
		params,
		parse: generalParser(purchaseInvoiceListBuilder),
		path: '/purchaseinvoicelist.nv',
	});
}
