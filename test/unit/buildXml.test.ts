import 'mocha';
import * as chai from 'chai';
import {build} from '../../src/buildXml';

const expect = chai.expect;

describe('buildXml', () => {
	describe('build', () => {
		it('should build xml', () => {
			const o = {
				simple: {
					_value: 'simple',
					_attributes: {
						foo: 'bar',
					},
				},
			};
			expect(build(o)).to.equal('<simple foo="bar">simple</simple>');
		});
		it('should build xml with nested object', () => {
			const o = {
				simple: {
					_attributes: {
						foo: 'bar',
					},
					foo: 'bar',
				},
			};
			expect(build(o)).to.equal('<simple foo="bar"><foo>bar</foo></simple>');
		});
		it('should build xml with nested array', () => {
			const o = {
				simple: {
					_attributes: {
						foo: 'bar',
					},
					_value: [
						{
							foo: 'bar',
						},
						{
							foo: 'bar',
						},
					],
				},
			};
			expect(build(o)).to.equal('<simple foo="bar"><foo>bar</foo><foo>bar</foo></simple>');
		});
	});
});
