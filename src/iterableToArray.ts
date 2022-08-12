import { isIterable } from "@vangware/predicates";
import type { AsynchronousIterable, ReadOnlyArray } from "@vangware/types";
import { reduce } from "./reduce.js";

/**
 * Reducer used by `iterableToArray` to loop over entries and reduce them to an
 * array.
 *
 * @category Internal
 * @example
 * ```typescript
 * reduceIterableToArray(anIterable); // [ an array with values of iterable ]
 * ```
 * @param entries Entries to reduce.
 * @returns Object with entries.
 */
const reduceIterableToArray = reduce(item => (array: ReadOnlyArray) => [
	...array,
	item,
])([]) as <Item>(
	asyncIterable: AsynchronousIterable<Item>,
) => Promise<ReadOnlyArray<Item>>;

/**
 * Turns given iterable or asynchronous iterable into an array.
 *
 * @category Reducers
 * @example
 * ```typescript
 * iterableToArray([1, 2, 3, 4]); // [1, 2, 3, 4]
 * ```
 * @param iterable Iterable to be turned into an array.
 * @returns Array made of iterable items.
 */
export const iterableToArray = <Iterable extends AsynchronousIterable>(
	iterable: Iterable,
) =>
	(isIterable(iterable)
		? [...iterable]
		: reduceIterableToArray(
				iterable,
		  )) as Iterable extends AsynchronousIterable<infer Item>
		? Iterable extends AsyncIterable<Item>
			? Promise<ReadOnlyArray<Item>>
			: ReadOnlyArray<Item>
		: never;
