import {ISalesInvoice, Params} from './types';
import {build} from '../../../buildXml';
import {IApiProvider} from '../../../api';
export * from './types';

export default async function (api: IApiProvider, salesInvoice: ISalesInvoice, params: Params | undefined = undefined) {
	return api.request({
		body: `<root><salesInvoice>${build(salesInvoice)}</salesInvoice></root>`,
		method: 'POST',
		params,
		path: '/salesinvoice.nv',
	});
}
