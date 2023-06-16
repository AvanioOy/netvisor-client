export default interface IInvoiceLine {
	productIdentifier: {
		_value: string;
		_attributes: {
			type: 'netvisor' | 'customer' | 'primaryeancode' | 'secondaryeancode';
		};
	};
	productName?: string;
	productunitPrice: {
		_value: number;
		_attributes: {
			type: 'gross' | 'net' | 'netvisor';
		};
	};
	productUnitPurchasePrice?: {
		_value: number;
		_attributes: {
			type: 'net';
		};
	};
	productVatPercentage: {
		_value: number;
		_attributes?: {
			vatcode: string;
		};
	};
	salesInvoiceProductLineQuantity: number;
	salesInvoiceLineDiscountPercentage?: {
		_value?: number;
		_attributes?: {
			type?: 'netvisor';
		};
	};
	salesInvoiceProductLineFreeText?: string;
	salesInvoiceProductLineVatSum?: number;
	salesInvoiceProductLineSum?: number;
	salesInvoiceProductLineInventoryId?: number;
	accountingAccountSuggestion?: number;
	productUnitName?: string;
	deliveryDate?: {
		_value: string;
		_attributes: {
			format: 'ansi';
		};
	};
	orderNumber?: string;
	proposedAccount?: {
		_value: number;
		_attributes: {
			type: 'customer';
		};
	};
	accountDimensionText?: string;
}
