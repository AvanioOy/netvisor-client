import {integerValue, objectSchemaValue, rootParser, XmlMappingSchema} from '@avanio/xml-mapper';
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

export interface BatchParserOpts<T, U> {
	schema: XmlMappingSchema<T>;
	key: keyof T;
	listSchema: XmlMappingSchema<U>;
	listKey: keyof U;
	expectList: boolean;
}
/**
 * Helper for parsing batch details
 * It is assumed that schema contains only a single field
 */
export function batchRootParser<T extends Record<string, unknown>, U extends Record<string, unknown>>(
	opts: BatchParserOpts<T, U>,
): (xml: string) => Promise<U> {
	if (!opts.expectList) {
		return async function (xml: string) {
			const parsed = (await generalRootParser(opts.schema)(xml)) as T;
			if (!(opts.key in parsed)) {
				throw new Error('Key not present');
			}
			// note: this isn't safe if U contains more than one key
			return {
				[opts.listKey]: [parsed[opts.key]],
			} as U;
		};
	}
	return generalRootParser(opts.listSchema);
}

export interface IInsertedDocuments extends Record<string, unknown> {
	Replies: {
		InsertedDataIdentifier: number;
	};
}

export function insertedDocumentsParser(): (xml: string) => Promise<number> {
	const repliesBuilder: XmlMappingSchema<IInsertedDocuments['Replies']> = {
		InsertedDataIdentifier: {
			mapper: integerValue,
		},
	};

	const insertedDocumentsBuilder: XmlMappingSchema<IInsertedDocuments> = {
		Replies: {
			mapper: objectSchemaValue(repliesBuilder),
		},
	};
	return async function (xml: string) {
		const data = await generalRootParser<IInsertedDocuments>(insertedDocumentsBuilder)(xml);
		return data?.Replies?.InsertedDataIdentifier ?? null;
	};
}
