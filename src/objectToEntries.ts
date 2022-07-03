import type { Entry, ReadOnlyRecord } from "@vangware/types";

/**
 * Yields all entries of an object.
 *
 * @category Common
 * @category Generators
 * @example
 * ```typescript
 * const entries = objectEntries({ a: 1, b: 2 });
 * entries.next(); // { value: ["a", 1], done: false }
 * entries.next(); // { value: ["b", 2], done: false }
 * entries.next(); // { value: undefined, done: true }
 * ```
 * @param input Object to get entries from.
 * @yields Entries of the given object.
 */
export const objectToEntries = function* <Key extends PropertyKey, Value>(
	input: ReadOnlyRecord<Value, Key>,
) {
	// eslint-disable-next-line functional/no-loop-statement
	for (const key in input) {
		// eslint-disable-next-line functional/no-conditional-statement
		if (Object.hasOwn(input, key)) {
			yield [key, input[key]] as Entry<Key, Value>;
		}
	}

	// eslint-disable-next-line functional/no-loop-statement
	for (const symbolKey of Object.getOwnPropertySymbols(input)) {
		yield [symbolKey as Key, input[symbolKey as Key]] as Entry<Key, Value>;
	}
};
