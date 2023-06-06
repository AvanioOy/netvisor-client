import 'mocha';
import * as chai from 'chai';
import {ApiProvider, resources} from '../src';
import dotenv from 'dotenv';
import {EnviromentConfigProvider} from '../src/api';

dotenv.config();

const expect = chai.expect;

describe('index.ts', () => {
	it('it should get a customer list', async () => {
		const conf = new EnviromentConfigProvider();
		const api = new ApiProvider(conf);
		const root = await resources.customer.getCustomerList(api);
		expect(root?.customers).to.be.an('array');
		expect(root?.customers).to.have.length.greaterThan(0);
	});
});
