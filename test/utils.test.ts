import 'mocha';
import * as chai from 'chai';
import {parseResponseStatus} from '../src/utils';

const expect = chai.expect;
const errorMsg = 'Could not parse response status';

describe('status.ts', () => {
	it('should parse response status', () => {
		const xml =
			'<?xml version="1.0" encoding="utf-8" standalone="yes"?>\r\n<Root>\r\n    <ResponseStatus>\r\n        <Status>FAILED</Status>\r\n        <Status>AUTHENTICATION_FAILED :: URI-metodi ei kelpaa, katso dokumentaatio. Käytä MAC-tiivisteen laskentaan merkkijonoa: https://isvapi.netvisor.fi/customerlist.nv&Demokäyttäjä Avanio&F2FD629D-CD04-4AF7-8F9B-4FE69CE6099C_31405&2023-06-05T13:12:06.378Z&FI&2729069-3&TRANSID57398077988731000&YOUR_PRIVATE_KEY_HERE :: F634424F4C3F10A28CEFB39AD20896F6E10CAD5F023FA4748469B70D37F8C00C</Status>\r\n        <TimeStamp>5.6.2023 16:12:09</TimeStamp>\r\n    </ResponseStatus>\r\n</Root>';
		const responseStatus = parseResponseStatus(xml);
		expect(responseStatus.status).to.be.equal('FAILED');
		expect(responseStatus.statusMessage).to.be.equal(
			'AUTHENTICATION_FAILED :: URI-metodi ei kelpaa, katso dokumentaatio. Käytä MAC-tiivisteen laskentaan merkkijonoa: https://isvapi.netvisor.fi/customerlist.nv&Demokäyttäjä Avanio&F2FD629D-CD04-4AF7-8F9B-4FE69CE6099C_31405&2023-06-05T13:12:06.378Z&FI&2729069-3&TRANSID57398077988731000&YOUR_PRIVATE_KEY_HERE :: F634424F4C3F10A28CEFB39AD20896F6E10CAD5F023FA4748469B70D37F8C00C',
		);
		expect(responseStatus.timestamp).to.be.equal('5.6.2023 16:12:09');
	});
	it('should throw error if response status is not found', () => {
		const xml = '<?xml version="1.0" encoding="utf-8" standalone="yes"?>\r\n<Root>\r\n</Root>';
		expect(() => parseResponseStatus(xml)).to.throw(errorMsg);
	});
	it('should throw error if status is not found in response status', () => {
		const xml =
			'<?xml version="1.0" encoding="utf-8" standalone="yes"?>\r\n<Root>\r\n    <ResponseStatus>\r\n        <TimeStamp>5.6.2023 16:12:09</TimeStamp>\r\n    </ResponseStatus>\r\n</Root>';
		expect(() => parseResponseStatus(xml)).to.throw(errorMsg);
	});
	it('should set message to status if status message is not found in response status', () => {
		const xml =
			'<?xml version="1.0" encoding="utf-8" standalone="yes"?>\r\n<Root>\r\n    <ResponseStatus>\r\n        <Status>FAILED</Status>\r\n        <TimeStamp>5.6.2023 16:12:09</TimeStamp>\r\n    </ResponseStatus>\r\n</Root>';
		const responseStatus = parseResponseStatus(xml);
		expect(responseStatus.statusMessage).to.be.equal('FAILED');
		expect(responseStatus.status).to.be.equal('FAILED');
	});
	it('should throw error if timestamp is not found in response status', () => {
		const xml =
			'<?xml version="1.0" encoding="utf-8" standalone="yes"?>\r\n<Root>\r\n    <ResponseStatus>\r\n        <Status>FAILED</Status>\r\n    </ResponseStatus>\r\n</Root>';
		expect(() => parseResponseStatus(xml)).to.throw(errorMsg);
	});
	it('should throw error if status is empty in response status', () => {
		const xml =
			'<?xml version="1.0" encoding="utf-8" standalone="yes"?>\r\n<Root>\r\n    <ResponseStatus>\r\n        <Status></Status>\r\n        <TimeStamp>5.6.2023 16:12:09</TimeStamp>\r\n    </ResponseStatus>\r\n</Root>';
		expect(() => parseResponseStatus(xml)).to.throw(errorMsg);
	});
});
