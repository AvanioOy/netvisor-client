import {dateValue, directArraySchemaValue, integerValue, stringValue, XmlMappingSchema} from '@avanio/xml-mapper';
import {ISalesInvoice} from './types';

const salesInvoiceBuilder: XmlMappingSchema<ISalesInvoice> = {
	netvisorKey: {
		mapper: integerValue,
		required: true,
	},
	invoiceNumber: {
		mapper: stringValue,
		required: true,
	},
	invoiceDate: {
		mapper: dateValue,
		required: true,
	},
	invoiceStatus: {
		mapper: stringValue,
		required: true,
	},
	invoiceSum: {
		mapper: stringValue,
		required: true,
	},
};

export type ISalesInvoiceRoot = {
	salesInvoices: ISalesInvoice[];
};

const salesInvoiceListBuilder: XmlMappingSchema<ISalesInvoiceRoot> = {
	salesInvoices: {mapper: directArraySchemaValue('salesInvoiceList', salesInvoiceBuilder), required: true},
};

export default salesInvoiceListBuilder;
