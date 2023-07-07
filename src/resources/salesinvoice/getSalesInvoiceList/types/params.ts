import {InvoiceStatus} from '../../types';

export default interface IParams {
	listtype?: '1'; // nothing = salesinvoice, 1 = salesorderlist
	invoicesabovenetvisorkey?: number;
	begininvoiceDate?: string;
	endinvoiceDate?: string;
	invoiceNumber?: string;
	invoiceStatus?: InvoiceStatus;
	lastmodifiedstart?: string;
	lastmodifiedend?: string;
	salesinvoicebatchid?: number;
	customerCode?: string;
	customerNetvisorKey?: number;
	secondName?: string;
	secondNameNetvisorKey?: number;
	invoicingCustomerCountryCode?: string;
	replyOption?: '1' | '2' | '3';
}
