import 'mocha';
import * as chai from 'chai';
import {parse} from '../src/parse';
import {Response} from 'cross-fetch';

const expect = chai.expect;

describe('parse.ts', () => {
	describe('parser', () => {
		it('should parse response', async () => {
			const mockParser = (xml: string) => {
				return xml;
			};
			const parser = parse(mockParser);
			expect(parser).to.be.a('function');
			expect(await parser(new Response('hello'))).to.equal('hello');
		});
	});
});
