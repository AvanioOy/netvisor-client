import {arraySchemaValue, directArraySchemaValue, integerValue, stringValue, XmlMappingSchema} from '@avanio/xml-mapper';
import {generalParser} from '../../parse';
import {IApiProvider} from '../../api';
import {NetVisorBoolean} from '..';

export interface IParams {
	showHidden?: NetVisorBoolean;
}

export type IDimensionDetail = {
	netvisorkey: number;
	name: string;
	isHidden: string;
	level: number;
	sort: number;
	endSort: number;
	fatherId: number;
};

export type IDimension = {
	netvisorkey: number;
	name: string;
	isHidden: string;
	linkType: number;
	dimensionDetails: IDimensionDetail[];
};

const dimensionDetailBuilder: XmlMappingSchema<IDimensionDetail> = {
	endSort: {mapper: integerValue, required: true},
	fatherId: {mapper: integerValue, required: true},
	isHidden: {mapper: stringValue, required: true},
	level: {mapper: integerValue, required: true},
	name: {mapper: stringValue, required: true},
	netvisorkey: {mapper: integerValue, required: true},
	sort: {mapper: integerValue, required: true},
};

const dimensionBuilder: XmlMappingSchema<IDimension> = {
	dimensionDetails: {mapper: arraySchemaValue(dimensionDetailBuilder), required: true},
	isHidden: {mapper: stringValue, required: true},
	linkType: {mapper: integerValue, required: true},
	name: {mapper: stringValue, required: true},
	netvisorkey: {mapper: integerValue, required: true},
};

export type IDimensionRoot = {
	dimensions: IDimension[];
};

export const dimensionListBuilder: XmlMappingSchema<IDimensionRoot> = {
	dimensions: {mapper: directArraySchemaValue('dimensionNameList', dimensionBuilder), required: true},
};

export default async function (api: IApiProvider, params: IParams | undefined = undefined) {
	return api.request({
		method: 'GET',
		params,
		parse: generalParser(dimensionListBuilder),
		path: '/dimensionlist.nv',
	});
}
