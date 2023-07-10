import {ICustomerBaseInformation, ICustomerFinvoiceDetails} from '.';

export default interface ICustomer extends Record<string, unknown> {
	customerBaseInformation: ICustomerBaseInformation;
	customerFinvoiceDetails: ICustomerFinvoiceDetails;
}
