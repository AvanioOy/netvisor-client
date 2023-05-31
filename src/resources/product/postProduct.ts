import {AttributeObject, build} from '../../buildXml';
import {IApiProvider} from '../../api';
import {InventoryBatchLinkingMode} from '.';
import {NetVisorBoolean} from '..';

export interface Params {
	method: 'Add' | 'Edit';
	id?: number;
}

export interface IBaseInformation {
	productCode?: string;
	productGroup: string;
	name: string;
	description?: string;
	unitPrice: number;
	unit?: string;
	unitWeight?: number;
	purchasePrice?: number;
	tariffHeading?: string;
	commissionPercentage?: number;
	isActive: NetVisorBoolean;
	isSalesProduct: NetVisorBoolean;
	inventoryEnabled?: NetVisorBoolean;
	inventoryBactchLinkingMode: InventoryBatchLinkingMode;
	countryOfOrigin?: {
		_value: string;
		_attributes: {
			type: 'ISO-3166';
		};
	};
	primaryEanCode?: string;
	secondaryEanCode?: string;
	inventoryAlertLimit?: number;
}

export interface IBookkeepingDetails {
	defaultVatPercentage: number;
	defaultDomesticAccountNumber?: number;
	defaultEUAccountNumber?: number;
	defaultOutsideEUAccountNumber?: number;
}

export interface IAdditionalInformation {
	productNetWeight?: number;
	productGrossWeight?: number;
	productWeightUnit?: string;
	productPackageInformation?: {
		packageWidth: number;
		packageHeight: number;
		packageLength: number;
	};
	dimension?: {
		dimensionName: string;
		dimensionItem: string;
	};
}

export interface IProductCustomTags {
	productCustomTag: {
		tagName: string;
		tagValue: string;
	}[];
}

export interface IProduct {
	productBaseInformation: IBaseInformation;
	productBookkeepingDetails?: IBookkeepingDetails;
	productAdditionalInformation?: IAdditionalInformation;
	productCustomTags?: IProductCustomTags;
}

export default async function (product: IProduct, api: IApiProvider, params: Params | undefined = undefined) {
	return api.request({
		body: `<root><Product>${build(product)}</Product></root>`,
		method: 'POST',
		params,
		path: '/product.nv',
	});
}
