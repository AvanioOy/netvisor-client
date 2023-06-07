import {directArraySchemaValue, integerValue, stringValue, XmlMappingSchema} from '@avanio/xml-mapper';
import {generalParser} from '../../parse';
import {IApiProvider} from '../../api';

export interface IParams {
	keyword?: string;
	changedsince?: string;
	customercodelist?: string;
}

export type ICustomer = {
	netvisorkey: number;
	name: string;
	code: string;
	organisationIdentifier: string;
	customerGroupId: string;
	customerGroupName: string;
	uri: string;
};

const customerBuilder: XmlMappingSchema<ICustomer> = {
	code: {mapper: stringValue, emptyAsNull: false},
	customerGroupId: {mapper: stringValue},
	customerGroupName: {mapper: stringValue},
	name: {mapper: stringValue, required: true},
	netvisorkey: {mapper: integerValue, required: true},
	organisationIdentifier: {mapper: stringValue},
	uri: {mapper: stringValue, required: true},
};

export type ICustomerRoot = {
	customers: ICustomer[];
};

export const customerListBuilder: XmlMappingSchema<ICustomerRoot> = {
	customers: {mapper: directArraySchemaValue('customerList', customerBuilder), required: true},
};

export default async function (api: IApiProvider, params: IParams | undefined = undefined) {
	return api.request({
		method: 'GET',
		params,
		parse: generalParser(customerListBuilder),
		path: '/customerlist.nv',
	});
}
