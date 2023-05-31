export type AttributeObject<T> = {
	[K in keyof T]: T[K] extends object
		? AttributeObject<T[K]> & {
				_attributes?: Record<string, string>;
		  }
		: T[K];
} & {
	_attributes?: Record<string, string>;
};

export function build<T>(obj: AttributeObject<T>, path = ''): string {
	return Object.keys(obj).reduce((acc, key) => {
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
		if (typeof value === 'object' && value?._value) {
			return `${acc}<${key}${attributes}>${value._value}</${key}>`;
		}
		if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
			return `${acc}<${key}${attributes}>${build(value, path + '/' + key)}</${key}>`;
		}
		if (typeof value === 'object' && value !== null && Array.isArray(value)) {
			return `${acc}<${key}${attributes}>${value.map((v) => build(v, path + '/' + key)).join('')}</${key}>`;
		}
		return `${acc}<${key}${attributes}>${value}</${key}>`;
	}, '');
}
