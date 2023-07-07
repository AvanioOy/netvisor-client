import {IDimension, ISalesInvoice, ISalesInvoiceProductLine, ISalesInvoiceRow} from './types';
import {XmlMappingSchema, arraySchemaValue, dateValue, integerValue, objectSchemaValue, stringValue, inlineArraySchemaValue} from '@avanio/xml-mapper';

export type ISalesInvoiceRoot = {
	salesInvoices: ISalesInvoice[];
};

const dimensionBuilder: XmlMappingSchema<IDimension> = {
	dimensionName: {
		mapper: stringValue,
		required: true,
	},
	dimensionItem: {
		mapper: stringValue,
		required: true,
	},
};

const salesInvoiceProductLineBuilder: XmlMappingSchema<ISalesInvoiceProductLine> = {
	netvisorKey: {
		mapper: integerValue,
		required: true,
	},
	salesInvoiceProductLineSum: {
		mapper: stringValue,
		required: true,
	},
	dimension: {
		mapper: inlineArraySchemaValue('dimension', dimensionBuilder),
	},
};

const salesInvoiceRowBuilder: XmlMappingSchema<ISalesInvoiceRow> = {
	salesInvoiceProductLine: {
		mapper: objectSchemaValue(salesInvoiceProductLineBuilder),
	},
};

const salesInvoiceBuilder: XmlMappingSchema<ISalesInvoice> = {
	salesInvoiceNetvisorKey: {
		mapper: integerValue,
		required: true,
	},
	salesInvoiceNumber: {
		mapper: stringValue,
		required: true,
	},
	invoiceStatus: {
		mapper: stringValue,
		required: true,
	},
	salesInvoiceAmount: {
		mapper: stringValue,
		required: true,
	},
	salesInvoiceDate: {
		mapper: dateValue,
		required: true,
	},
	salesInvoiceDueDate: {
		mapper: dateValue,
		required: true,
	},
	invoiceLines: {
		mapper: arraySchemaValue(salesInvoiceRowBuilder),
	},
};

const salesInvoiceRootBuilder: XmlMappingSchema<ISalesInvoiceRoot> = {
	salesInvoices: {mapper: arraySchemaValue(salesInvoiceBuilder), required: true},
};

export default salesInvoiceRootBuilder;
