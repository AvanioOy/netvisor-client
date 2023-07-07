/**
 * NOTE: This file is partially typed
 */
import {ApiProvider} from '../../../api';
import {generalRootParser} from '../../../parse';
import {Params} from './types';
import salesInvoiceRootBuilder from './schema';

export default async function (api: ApiProvider, params: Params | undefined = undefined) {
	return api.request({
		method: 'GET',
		params,
		parse: generalRootParser(salesInvoiceRootBuilder),
		path: '/getsalesinvoice.nv',
	});
}
