/**
 * NOTE: This file is partially typed
 */

import {ApiProvider} from '../../../api';
import customerRootBuilder, {ICustomerRoot} from './schema';
import {generalRootParser} from '../../../parse';
import {Params} from './types';

export default async function (api: ApiProvider, params: Params) {
	return api.request({
		method: 'GET',
		params,
		parse: generalRootParser<ICustomerRoot>(customerRootBuilder),
		path: '/getcustomer.nv',
	});
}
