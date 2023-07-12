import {arraySchemaValue, dateValue, integerValue, objectSchemaValue, stringValue, XmlMappingSchema} from '@avanio/xml-mapper';
import {batchRootParser} from '../../parse';
import {IApiProvider} from '../../api';

export interface IParams {
	netvisorKeyList?: string;
	version: '2';
	include?: 'actions' | 'handlinghistory' | 'previewimage' | 'invoiceimage';
	omitAttachments?: 'true' | 'false';
}

export type IPurchaseInvoiceDimension = {
	dimensionName: string;
	dimensionNameNetvisorKey: number;
	dimensionDetailName: string;
	dimensionDetailNetvisorKey: number;
};

export type IPurchaseInvoiceLine = {
	netvisorkey: number;
	lineSum: number;
	lineNetSum: number;
	unitPrice: number;
	vatPercent: number;
	vatCode: string;
	description?: string;
	unit?: string;
	orderedAmount?: number;
	deliveredAmount?: number;
	productCode?: string;
	discountPercentage?: number;
	productName?: string;
	accountingSuggestionBookkeepingAccountNetvisorkey?: string;
	accountingSuggestionBookkeepingAccount?: string;
	PurchaseInvoiceLineDimensions?: IPurchaseInvoiceDimension[];
};

export type IPurchaseInvoice = {
	purchaseInvoiceNetvisorKey: string;
	purchaseInvoiceNumber: string;
	purchaseInvoiceDate: Date;
	purchaseInvoiceEventDate: Date;
	purchaseInvoiceDeliveryDate: Date;
	purchaseInvoiceDueDate: Date;
	purchaseInvoiceValueDate: Date;
	purchaseInvoiceReferenceNumber: string;
	purchaseInvoiceAgreementIdentifier: string;
	purchaseInvoiceVendorBankAccountNumber: string;
	isPurchaseInvoiceVendorBankAccountDeleted: string;
	isPurchaseInvoiceVendorBankAccountFromSEPARegion: string;
	purchaseInvoiceAmount: number;
	purchaseInvoicePaidAmount: number;
	foreignCurrencyAmount: number;
	foreignCurrencyNameID: string;
	invoiceStatus: string; // this is under development according to Netvisor DOCS
	approvalStatus: string; // 'open' | 'infactualverification' | 'approved' | 'accepted' | 'acceptorrejected';
	purchaseInvoiceOurReference: string;
	purchaseInvoiceYourReference: string;
	purchaseInvoiceDescription: string;
	vendorNetvisorKey: number;
	vendorOrganizationIdentifier: string;
	vendorCode: string;
	vendorName: string;
	vendorAddressLine: string;
	vendorPostNumber: string;
	vendorTown: string;
	vendorCountry: string;
	fingerprint: string;
	voucherID?: number;
	isAccounted: string; // 'true' | 'false';
	invoiceLines?: IPurchaseInvoiceLine[];
};

export type IPurchaseInvoiceRoot = {
	purchaseInvoices: IPurchaseInvoice[];
};

export type IPurchaseInvoiceSingleRoot = {
	purchaseInvoice: IPurchaseInvoice;
};

export const purchaseDimensionBuilder: XmlMappingSchema<IPurchaseInvoiceDimension> = {
	dimensionName: {
		mapper: stringValue,
		required: true,
	},
	dimensionNameNetvisorKey: {
		mapper: integerValue,
		required: true,
	},
	dimensionDetailName: {
		mapper: stringValue,
		required: true,
	},
	dimensionDetailNetvisorKey: {
		mapper: integerValue,
		required: true,
	},
};

export const purchaseInvoiceLineBuilder: XmlMappingSchema<IPurchaseInvoiceLine> = {
	netvisorkey: {
		mapper: integerValue,
		required: true,
	},
	lineSum: {
		mapper: integerValue,
		required: true,
	},
	lineNetSum: {
		mapper: integerValue,
		required: true,
	},
	unitPrice: {
		mapper: integerValue,
		required: true,
	},
	vatPercent: {
		mapper: integerValue,
		required: true,
	},
	vatCode: {
		mapper: stringValue,
		required: true,
	},
	description: {
		mapper: stringValue,
	},
	unit: {
		mapper: stringValue,
	},
	orderedAmount: {
		mapper: integerValue,
	},
	deliveredAmount: {
		mapper: integerValue,
	},
	productCode: {
		mapper: stringValue,
		required: true,
		emptyAsNull: false,
	},
	discountPercentage: {
		mapper: integerValue,
	},
	productName: {
		mapper: stringValue,
		required: true,
		emptyAsNull: false,
	},
	accountingSuggestionBookkeepingAccountNetvisorkey: {
		mapper: stringValue,
	},
	accountingSuggestionBookkeepingAccount: {
		mapper: stringValue,
	},
	PurchaseInvoiceLineDimensions: {
		mapper: arraySchemaValue(purchaseDimensionBuilder),
	},
};

export const purchaseInvoiceBuilder: XmlMappingSchema<IPurchaseInvoice> = {
	purchaseInvoiceNetvisorKey: {
		mapper: stringValue,
		required: true,
	},
	purchaseInvoiceNumber: {
		mapper: stringValue,
		required: true,
	},
	purchaseInvoiceDate: {
		mapper: dateValue,
	},
	purchaseInvoiceEventDate: {
		mapper: dateValue,
	},
	purchaseInvoiceDeliveryDate: {
		mapper: dateValue,
	},
	purchaseInvoiceDueDate: {
		mapper: dateValue,
	},
	purchaseInvoiceValueDate: {
		mapper: dateValue,
	},
	purchaseInvoiceReferenceNumber: {
		mapper: stringValue,
		required: true,
	},
	purchaseInvoiceAgreementIdentifier: {
		mapper: stringValue,
	},
	purchaseInvoiceVendorBankAccountNumber: {
		mapper: stringValue,
	},
	isPurchaseInvoiceVendorBankAccountDeleted: {
		mapper: stringValue,
	},
	isPurchaseInvoiceVendorBankAccountFromSEPARegion: {
		mapper: stringValue,
	},
	purchaseInvoiceAmount: {
		mapper: integerValue,
		required: true,
	},
	purchaseInvoicePaidAmount: {
		mapper: integerValue,
		required: true,
	},
	foreignCurrencyAmount: {
		mapper: integerValue,
	},
	foreignCurrencyNameID: {
		mapper: stringValue,
		required: true,
	},
	invoiceStatus: {
		mapper: stringValue,
		required: true,
	},
	approvalStatus: {
		mapper: stringValue,
		required: true,
	},
	purchaseInvoiceOurReference: {
		mapper: stringValue,
	},
	purchaseInvoiceYourReference: {
		mapper: stringValue,
	},
	purchaseInvoiceDescription: {
		mapper: stringValue,
		required: true,
		emptyAsNull: false,
	},
	vendorNetvisorKey: {
		mapper: integerValue,
		required: true,
	},
	vendorOrganizationIdentifier: {
		mapper: stringValue,
		required: true,
		emptyAsNull: false,
	},
	vendorCode: {
		mapper: stringValue,
		required: true,
		emptyAsNull: false,
	},
	vendorName: {
		mapper: stringValue,
		required: true,
	},
	vendorAddressLine: {
		mapper: stringValue,
		required: true,
		emptyAsNull: false,
	},
	vendorPostNumber: {
		mapper: stringValue,
		required: true,
		emptyAsNull: false,
	},
	vendorTown: {
		mapper: stringValue,
		required: true,
		emptyAsNull: false,
	},
	vendorCountry: {
		mapper: stringValue,
		required: true,
		emptyAsNull: false,
	},
	fingerprint: {
		mapper: stringValue,
		required: true,
	},

	voucherID: {
		mapper: integerValue,
	},
	isAccounted: {
		mapper: stringValue,
		required: true,
		emptyAsNull: false,
	},
	invoiceLines: {
		mapper: arraySchemaValue(purchaseInvoiceLineBuilder),
	},
};

export const purchaseInvoiceRootBuilder: XmlMappingSchema<IPurchaseInvoiceRoot> = {
	purchaseInvoices: {
		mapper: arraySchemaValue(purchaseInvoiceBuilder),
		required: true,
	},
};

export const purchaseInvoiceSingleRootBuilder: XmlMappingSchema<IPurchaseInvoiceSingleRoot> = {
	purchaseInvoice: {
		mapper: objectSchemaValue(purchaseInvoiceBuilder),
		required: true,
	},
};

export default async function (api: IApiProvider, params: IParams | undefined = undefined) {
	const numIds = params?.netvisorKeyList?.split(',').length;
	return api.request({
		method: 'GET',
		params,
		parse: batchRootParser({
			listSchema: purchaseInvoiceRootBuilder,
			listKey: 'purchaseInvoices',
			schema: purchaseInvoiceSingleRootBuilder,
			key: 'purchaseInvoice',
			expectList: numIds !== 1,
		}),
		path: '/getpurchaseinvoice.nv',
	});
}
