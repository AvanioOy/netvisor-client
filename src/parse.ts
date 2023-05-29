import {rootParser, XmlMappingSchema} from '@avanio/xml-mapper';
import {DOMParser} from '@xmldom/xmldom';

export function parse<T>(parser: (xml: string) => T) {
	return async (response: Response) => {
		const xml = await response.text();
		return parser(xml);
	};
}

export function generalParser<T extends Record<string, unknown>>(schema: XmlMappingSchema<T>) {
	return function (xml: string) {
		const domParser = new DOMParser();
		const doc = domParser.parseFromString(xml, 'text/xml');
		return rootParser<T>(doc.documentElement, schema, {
			ignoreCase: true,
		});
	};
}
