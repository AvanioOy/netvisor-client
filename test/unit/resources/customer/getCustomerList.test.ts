import 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import {IApiProvider, resources} from '../../../../src';

const expect = chai.expect;

const apiSpy = sinon.spy();
const handleRequestSpy = sinon.spy();

describe('customer', () => {
	describe('getCustomerList', () => {
		it('should call api', async () => {
			const api: IApiProvider = {
				request: apiSpy,
				handleRequest: handleRequestSpy,
			};
			await resources.customer.getCustomerList(api);
			expect(apiSpy.calledOnce).to.be.equal(true);
			expect(
				apiSpy.calledWith({
					method: 'GET',
					params: undefined,
					parse: sinon.match.func,
					path: '/customerlist.nv',
				}),
			).to.be.equal(true);
		});
	});
});
