/**
 * NOTE: This file is partially typed
 */
import {ApiProvider} from '../../../api';
import {batchRootParser} from '../../../parse';
import {Params} from './types';
import {salesInvoiceRootBuilder, salesInvoiceSingleRootBuilder} from './schema';

export default async function (api: ApiProvider, params: Params | undefined = undefined) {
	const numIds = params?.netvisorKeyList?.split(',').length;
	return api.request({
		method: 'GET',
		params,
		parse: batchRootParser({
			schema: salesInvoiceSingleRootBuilder,
			key: 'salesInvoice',
			listSchema: salesInvoiceRootBuilder,
			listKey: 'salesInvoices',
			expectList: numIds !== 1,
		}),
		path: '/getsalesinvoice.nv',
	});
}
