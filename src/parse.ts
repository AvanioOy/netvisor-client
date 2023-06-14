import {objectSchemaValue, rootParser, XmlMappingSchema} from '@avanio/xml-mapper';
import {DOMParser} from '@xmldom/xmldom';

export function generalParser<T extends Record<string, unknown>>(schema: XmlMappingSchema<T>): (xml: string) => Promise<T> {
	return async function (xml: string) {
		const domParser = new DOMParser();
		const doc = domParser.parseFromString(xml, 'text/xml');
		return rootParser<T>(doc.documentElement, schema, {
			ignoreCase: true,
		});
	};
}
export type IRoot<T> = {
	root: T;
};
export function generalRootParser<T extends Record<string, unknown>>(schema: XmlMappingSchema<T>): (xml: string) => Promise<T> {
	return async function (xml: string) {
		const rootBuilder: XmlMappingSchema<IRoot<T>> = {
			root: {
				mapper: objectSchemaValue(schema),
				required: true,
			},
		};
		const domParser = new DOMParser();
		const doc = domParser.parseFromString(xml, 'text/xml');
		return rootParser<IRoot<T>>(doc.documentElement, rootBuilder, {
			ignoreCase: true,
		}).root;
	};
}
