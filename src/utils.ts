import {DOMParser} from '@xmldom/xmldom';

export interface IResponseStatus {
	status: string;
	statusMessage: string;
	timestamp: string;
}
const parser = new DOMParser();

const errorMsg = 'Could not parse response status';

export function parseResponseStatus(xml: string): IResponseStatus {
	const parsed = parser.parseFromString(xml, 'text/xml');
	const responseStatusElements = parsed.getElementsByTagName('ResponseStatus');
	if (!responseStatusElements || responseStatusElements.length !== 1) throw new Error(errorMsg);
	const responseStatus = responseStatusElements[0];
	const statusElements = responseStatus.getElementsByTagName('Status');
	if (!statusElements || statusElements.length < 1) throw new Error(errorMsg);
	const status = statusElements[0].textContent;
	const statusMessage = statusElements[1]?.textContent || status;
	const timestampElements = responseStatus.getElementsByTagName('TimeStamp');
	if (!timestampElements || timestampElements.length !== 1) throw new Error(errorMsg);
	const timestamp = timestampElements[0].textContent;

	if (!status || !statusMessage || !timestamp) throw new Error(errorMsg);

	return {
		status,
		statusMessage,
		timestamp,
	};
}

export function parseNumber(value: string): number {
	return parseFloat(value.replace(',', '.'));
}
