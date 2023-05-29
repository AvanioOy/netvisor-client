import 'mocha';
import * as chai from 'chai';
import {hello} from '../src';

const expect = chai.expect;

describe('index.ts', () => {
	describe('hello', () => {
		it('should return world', () => {
			expect(hello()).to.be.equal('world');
		});
	});
});
