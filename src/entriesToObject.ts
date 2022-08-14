import type {
	AsynchronousIterable,
	AsynchronousIterableItem,
	Entry,
	EntryKey,
	EntryValue,
	ReadOnlyRecord,
} from "@vangware/types";
import { reduce } from "./reduce.js";
import type { ReducerOutput } from "./types/ReducerOutput.js";

/**
 * Takes an entries iterable or asynchronous iterable and returns an object.
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
export const entriesToObject = reduce(
	<Key extends PropertyKey, Value>([key, value]: Entry<Key, Value>) =>
		(object: ReadOnlyRecord<Value, Key>) =>
			({ ...object, [key]: value } as ReadOnlyRecord<Value, Key>),
	// eslint-disable-next-line no-null/no-null
)(Object.create(null) as ReadOnlyRecord) as <
	Iterable extends AsynchronousIterable<Entry>,
>(
	iterable: Iterable,
) => ReducerOutput<
	Iterable,
	ReadOnlyRecord<
		EntryValue<AsynchronousIterableItem<Iterable>>,
		EntryKey<AsynchronousIterableItem<Iterable>>
	>
>;
