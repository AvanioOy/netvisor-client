import 'mocha';
import * as chai from 'chai';
import * as fs from 'fs';
import {customerListBuilder, ICustomerRoot} from '../../src/resources/customer/getCustomerList';
import {generalParser} from '../../src/parse';

/*
<Root>
    <Customerlist>
        <Customer>
            <Netvisorkey>1</Netvisorkey>
            <Name>Temporary customer</Name>
            <Code>TEMP</Code>
            <OrganisationIdentifier />
	    <CustomerGroupID />
	    <CustomerGroupName />
            <Uri>/getcustomer.nv?id=1</Uri>
        </Customer>
        <Customer>
            <Netvisorkey>2</Netvisorkey>
            <Name>Customer Oy</Name>
            <Code>11</Code>
            <OrganisationIdentifier>6554467-4</OrganisationIdentifier>
	    <CustomerGroupID>1</CustomerGroupID>
	    <CustomerGroupName>Test customer</CustomerGroupName>
            <Uri>/getcustomer.nv?id=2</Uri>
        </Customer>
    </Customerlist>
</Root>

*/
const fileName = 'test.xml';
const res = fs.readFileSync(fileName).toString();

const expectedCustomers = [
	{
		netvisorkey: '1',
		name: 'Temporary customer',
		code: 'TEMP',
		organisationIdentifier: null,
		customerGroupId: null,
		customerGroupName: null,
		uri: '/getcustomer.nv?id=1',
	},
	{
		netvisorkey: '2',
		name: 'Customer Oy',
		code: '11',
		organisationIdentifier: '6554467-4',
		customerGroupId: '1',
		customerGroupName: 'Test customer',
		uri: '/getcustomer.nv?id=2',
	},
];
const expect = chai.expect;

describe('index.ts', () => {
	describe('hello', () => {
		it('should return customer', () => {
			const parser = generalParser(customerListBuilder);
			const result = parser(res);
			expect(result).to.be.deep.equal({customers: expectedCustomers} as ICustomerRoot);
		});
	});
});
