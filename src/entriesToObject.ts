import { isArray } from "@vangware/predicates";
import type { Entry, ReadOnlyRecord } from "@vangware/types";
import { reduce } from "./reduce.js";

/**
 * Takes an entries iterable and returns an object.
 *
 * @category Reducers
 * @example
 * ```typescript
 * entriesToObject([["key", "value"]]); // { key: "value" }
 * entriesToObject([
 * 	["foo", "bar"],
 * 	["number", 1]
 * ]); // { foo: "bar", number: 1 }
 * ```
 * @returns Object constructed from entries.
 */
export const entriesToObject = <Key extends PropertyKey, Value>(
	iterable: Iterable<Entry<Key, Value>>,
) =>
	isArray(iterable)
		? (Object.assign(
				// eslint-disable-next-line no-null/no-null
				Object.create(null) as ReadOnlyRecord<Value, Key>,
				Object.fromEntries(iterable),
		  ) as ReadOnlyRecord<Value, Key>)
		: reduce(
				([key, value]: Entry<Key, Value>) =>
					(object: ReadOnlyRecord<Value, Key>) => ({
						...object,
						[key]: value,
					}),
				// eslint-disable-next-line no-null/no-null
		  )(Object.create(null) as ReadOnlyRecord<Value, Key>)(iterable);
