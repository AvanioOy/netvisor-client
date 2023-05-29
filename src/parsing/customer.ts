import {rootParser, stringValue, XmlMappingSchema, setLogger, directArraySchemaValue} from '@avanio/xml-mapper';
import {DOMParser} from '@xmldom/xmldom';

export type ICustomer = {
	netvisorkey: string;
	name: string;
	code: string;
	organisationIdentifier: string;
	customerGroupId: string;
	customerGroupName: string;
	uri: string;
};

const customerBuilder: XmlMappingSchema<ICustomer> = {
	code: {mapper: stringValue, required: true},
	customerGroupId: {mapper: stringValue},
	customerGroupName: {mapper: stringValue},
	name: {mapper: stringValue, required: true},
	netvisorkey: {mapper: stringValue, required: true},
	organisationIdentifier: {mapper: stringValue},
	uri: {mapper: stringValue, required: true},
};

export type IRoot = {
	customers: ICustomer[];
};

const customerListBuilder: XmlMappingSchema<IRoot> = {
	customers: {mapper: directArraySchemaValue('customerList', customerBuilder), required: true},
};

export function getCustomerList(xmlData: string): IRoot {
	const doc = new DOMParser().parseFromString(xmlData, 'text/xml');
	setLogger(console);
	return rootParser<IRoot>(doc.documentElement, customerListBuilder, {
		ignoreCase: true,
	});
}
