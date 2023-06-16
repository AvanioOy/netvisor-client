export type AttributeObject<T> = {
	[K in keyof T]: T[K] extends object
		? AttributeObject<T[K]> & {
				_attributes?: Record<string, string>;
		  }
		: T[K];
} & {
	_attributes?: Record<string, string>;
};

export function build<T>(obj: AttributeObject<T>, path = '', deepCopy = true): string {
	return Object.keys(obj).reduce((acc, key) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if (deepCopy) {
			obj = JSON.parse(JSON.stringify(obj));
		}
		let value = (obj as any)[key];
		let attributes = '';
		if (value?._attributes) {
			attributes =
				' ' +
				Object.entries(value._attributes)
					.map(([key, val]) => `${key}="${val}"`)
					.join(' ');
			delete value._attributes;
		}
		if (value?._value) {
			value = value._value;
		}
		if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
			return `${acc}<${key}${attributes}>${build(value, path + '/' + key, false)}</${key}>`;
		}
		if (typeof value === 'object' && value !== null && Array.isArray(value)) {
			return `${acc}<${key}${attributes}>${value.map((v) => build(v, path + '/' + key, false)).join('')}</${key}>`;
		}
		return `${acc}<${key}${attributes}>${value}</${key}>`;
	}, '');
}
