import IInvoiceLine from './salesinvoiceline';
import {NetVisorBoolean} from '../../..';

export default interface ISalesInvoice {
	salesInvoiceNumber?: number;
	salesInvoiceDate: {
		_value: string;
		_attributes: {
			format: 'ansi';
		};
	};
	salesInvoiceEventDate?: string;
	salesInvoiceDueDate?: {
		_value: string;
		_attributes: {
			format: 'ansi';
		};
	};
	salesInvoiceValueDate?: string;
	salesInvoiceDeliveryDate?: string;
	salesInvoiceDeliverytoCustomerDate?: string;
	salesInvoiceReferenceNumber?: string;
	salesInvoiceAmount?: {
		_value: string;
		_attributes?: {
			iso4217currencyCode?: string;
			priceType?: 'netvisor' | 'customer';
			currencyRate?: string;
		};
	};
	sellerIdentifier?: {
		_value: string;
		_attributes: {
			type: 'netvisor' | 'customer';
		};
	};
	sellerName?: string;
	invoiceType?: 'invoice' | 'order' | 'invvoicedraft';
	salesInvoiceStatus?: {
		_value: 'open' | 'unsent' | 'delivered' | 'undelivered';
		_attributes: {
			type: 'netvisor';
		};
	};
	salesInvoiceFreeTextBeforeLines?: string;
	salesInvoiceFreeTextAfterLines?: string;
	salesInvoiceOurReference?: string;
	salesInvoiceYourReference?: string;
	salesInvoicePrivateComment?: string;
	invoicingCustomeridentifier: {
		_value: string;
		_attributes: {
			type: 'netvisor' | 'customer' | 'organizationunitnumber';
			contactPersonId?: string;
		};
	};
	invoicingCustomerName?: string;
	invoicingCustomerNameExtension?: string;
	invoicingCustomerAddressLine?: string;
	invoicingCustomerPostNumber?: string;
	invoicingCustomerTown?: string;
	invoicingCustomerCountry?: {
		_value: string;
		_attributes: {
			type: 'ISO-3166';
		};
	};
	officeIdentifier?: {
		_value: string;
		_attributes: {
			type?: 'automatic';
		};
	};
	deliveryOffice?: {
		_value: string;
		_attributes: {
			type?: 'customer' | 'netvisor';
		};
	};
	deliveryAddressName?: string;
	deliveryAddressLine?: string;
	deliveryAddressPostNumber?: string;
	deliveryAddressTown?: string;
	deliveryAddressCountryCode?: {
		_value: string;
		_attributes: {
			type: 'ISO-3166';
		};
	};
	deliveryMethod?: string;
	deliveryTerm?: string;
	salesInvoiceTaxHandlingType?: 'countrygroup' | 'forcedomestic' | 'domesticconstructionservice' | 'notaxhandling';
	paymentTerm?: {
		_value: string;
		_attributes: {
			type: 'netvisor' | 'customer';
		};
	};
	paymentTermNetDays?: number;
	paymentTermCashDiscountDays?: number;
	paymentTermCashDiscountPercentage?: {
		_value: number;
		_attributes: {
			type: 'percentage';
		};
	};
	expectPartialPayments?: NetVisorBoolean;
	overrideVoucherSalesReceivablesAccountNumber?: number;
	salesInvoiceAgreementIdentifier?: string;
	printChannelFormat?: {
		_value: '1' | '2';
		_attributes: {
			type: 'netvisor' | 'customer';
		};
	};
	secondName?: {
		_value: string;
		_attributes: {
			type: 'netvisor' | 'customer';
		};
	};
	overrideRateOfOverDue?: number;
	orderNumber?: string;
	proposedAccount?: {
		_value: number;
		_attributes: {
			type: 'customer';
		};
	};
	accountDimensionText?: string;
	isThirdPartySales?: NetVisorBoolean;
	invoiceLines: {
		invoiceLine: {
			salesInvoiceProductLine: IInvoiceLine;
		};
	}[];
}
