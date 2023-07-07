import {ISalesInvoiceRow} from '.';

export default interface ISalesInvoice extends Record<string, unknown> {
	salesInvoiceNetvisorKey: number;
	salesInvoiceNumber: string;
	salesInvoiceDate: Date;
	salesInvoiceAmount: string;
	invoiceStatus: string;
	salesInvoiceDueDate: Date;
	invoiceLines: ISalesInvoiceRow[];
}
