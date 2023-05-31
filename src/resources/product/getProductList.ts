import {directArraySchemaValue, integerValue, stringValue, XmlMappingSchema} from '@avanio/xml-mapper';
import {generalParser, parse} from '../../parse';
import {IApiProvider} from '../../api';

export interface IParams {
	keyword?: string;
	changedsince?: string;
	customercodelist?: string;
	published?: '0' | '1';
	unpublished?: '0' | '1';
	deleted?: '0' | '1';
}

export type IProduct = {
	name: string;
	netvisorkey: number;
	productGroupDescription: string;
	productGroupId: number;
	unitGrossPrice: number;
	unitPrice: number;
	uri: string;
};

const customerBuilder: XmlMappingSchema<IProduct> = {
	name: {mapper: stringValue, required: true},
	netvisorkey: {mapper: integerValue, required: true},
	productGroupDescription: {mapper: stringValue},
	productGroupId: {mapper: integerValue},
	unitGrossPrice: {mapper: integerValue, required: true},
	unitPrice: {mapper: integerValue, required: true},
	uri: {mapper: stringValue, required: true},
};

export type IProductRoot = {
	customers: IProduct[];
};

export const productListBuilder: XmlMappingSchema<IProductRoot> = {
	customers: {mapper: directArraySchemaValue('productList', customerBuilder), required: true},
};

export default async function (api: IApiProvider, params: IParams | undefined = undefined) {
	return api.request({
		method: 'GET',
		params,
		parse: parse(generalParser(productListBuilder)),
		path: '/productlist.nv',
	});
}
