export default interface ISalesInvoice extends Record<string, unknown> {
	netvisorKey: number;
	invoiceNumber: string;
	invoiceDate: Date;
	invoiceStatus: string;
	invoiceSum: string;
}
