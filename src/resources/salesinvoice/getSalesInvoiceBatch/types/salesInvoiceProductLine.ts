import {IDimension} from '.';

export default interface ISalesInvoiceProductLine extends Record<string, unknown> {
	netvisorKey: number;
	salesInvoiceProductLineSum: string;
	dimension: IDimension[];
	productVatPercentage: number;
}
