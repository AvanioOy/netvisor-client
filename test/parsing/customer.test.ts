import 'mocha';
import * as chai from 'chai';
import * as fs from 'fs';
import {getCustomerList} from '../../src/parsing';

const fileName = 'test.xml';
const res = fs.readFileSync(fileName).toString();

const expect = chai.expect;

describe('index.ts', () => {
	describe('hello', () => {
		it('should return customer', () => {
			const customers = getCustomerList(res);
			console.log(customers);
			for (const customer of customers.customers) {
				console.log(customer);
			}
			expect(true).to.be.eq(true);
		});
	});
});
