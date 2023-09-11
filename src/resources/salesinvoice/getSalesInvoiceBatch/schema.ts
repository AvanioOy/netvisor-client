import {IDimension, ISalesInvoice, ISalesInvoiceProductLine, ISalesInvoiceRow} from './types';
import {arraySchemaValue, dateValue, inlineArraySchemaValue, integerValue, objectSchemaValue, stringValue, XmlMappingSchema} from '@avanio/xml-mapper';

export type ISalesInvoiceRoot = {
	salesInvoices: ISalesInvoice[];
};

export type ISalesInvoiceSingleRoot = {
	salesInvoice: ISalesInvoice;
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
	productVatPercentage: {
		mapper: integerValue,
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
	salesInvoiceOurReference: {
		mapper: stringValue,
	},
};

const salesInvoiceRootBuilder: XmlMappingSchema<ISalesInvoiceRoot> = {
	salesInvoices: {mapper: arraySchemaValue(salesInvoiceBuilder), required: true},
};

const salesInvoiceSingleRootBuilder: XmlMappingSchema<ISalesInvoiceSingleRoot> = {
	salesInvoice: {mapper: objectSchemaValue(salesInvoiceBuilder), required: true},
};

export {salesInvoiceRootBuilder, salesInvoiceSingleRootBuilder};
