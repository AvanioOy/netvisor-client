// NOTE: this is not fully typed

import {IApiProvider} from '../../../api';
import {generalParser} from '../../../parse';
import salesInvoiceListBuilder from './schema';
import IParams from './types/params';

export default async function (api: IApiProvider, params: IParams | undefined = undefined) {
	return api.request({
		method: 'GET',
		params,
		parse: generalParser(salesInvoiceListBuilder),
		path: '/salesinvoicelist.nv',
	});
}
