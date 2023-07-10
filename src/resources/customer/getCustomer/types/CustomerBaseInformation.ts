export default interface ICustomerBaseInformation extends Record<string, unknown> {
	netvisorKey: number;
	name: string;
	streetAddress: string;
	city: string;
	postNumber: string;
	emailInvoicingAddress: string;
	isPrivateCustomer: number;
}
