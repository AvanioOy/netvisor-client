import {ISalesInvoiceProductLine} from '.';

export default interface ISalesInvoiceRow extends Record<string, unknown> {
	salesInvoiceProductLine: ISalesInvoiceProductLine;
}
