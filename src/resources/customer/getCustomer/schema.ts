import {ICustomer} from './types';
import {XmlMappingSchema, integerValue, objectSchemaValue, stringValue} from '@avanio/xml-mapper';

const baseInformationBuilder: XmlMappingSchema<ICustomer['customerBaseInformation']> = {
	netvisorKey: {
		mapper: integerValue,
		required: true,
	},
	name: {
		mapper: stringValue,
		required: true,
	},
	streetAddress: {
		mapper: stringValue,
	},
	city: {
		mapper: stringValue,
	},
	postNumber: {
		mapper: stringValue,
	},
	emailInvoicingAddress: {
		mapper: stringValue,
	},
	isPrivateCustomer: {
		mapper: integerValue,
		required: true,
	},
};

const finvoiceDetailsBuilder: XmlMappingSchema<ICustomer['customerFinvoiceDetails']> = {
	finvoiceAddress: {
		mapper: stringValue,
	},
	finvoiceRouterCode: {
		mapper: stringValue,
	},
};

const customerBuilder: XmlMappingSchema<ICustomer> = {
	customerBaseInformation: {
		mapper: objectSchemaValue(baseInformationBuilder),
		required: true,
	},
	customerFinvoiceDetails: {
		mapper: objectSchemaValue(finvoiceDetailsBuilder),
		required: true,
	},
};

export type ICustomerRoot = {
	customer: ICustomer;
};

const customerRootBuilder: XmlMappingSchema<ICustomerRoot> = {
	customer: {
		mapper: objectSchemaValue(customerBuilder),
		required: true,
	},
};

export default customerRootBuilder;
