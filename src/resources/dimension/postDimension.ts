import {build} from '../../buildXml';
import {IApiProvider} from '../../api';

export interface IParams {
	method: 'add' | 'edit';
	updateParentReference?: 'true' | 'false';
}

export type IDimensionItem = {
	name: string;
	item: string;
	oldItem?: string;
	fatherId?: number;
	fatheritem?: string;
	isHidden?: 'true' | 'false';
};

export default async function (api: IApiProvider, dimensionItem: IDimensionItem, params: IParams | undefined) {
	return api.request({
		body: `<root><DimensionItem>${build(dimensionItem)}</DimensionItem></root>`,
		method: 'POST',
		params,
		path: '/dimensionitem.nv',
	});
}
