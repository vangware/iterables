import type { AsynchronousIterable, ReadOnlyArray } from "@vangware/types";
import { reduce } from "./reduce.js";

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
export const iterableToArray = reduce(item => (array: ReadOnlyArray) => [
	...array,
	item,
])([]) as <Iterable extends AsynchronousIterable>(
	iterable: Iterable,
) => Iterable extends AsynchronousIterable<infer Item>
	? Iterable extends AsyncIterable<Item>
		? Promise<ReadOnlyArray<Item>>
		: ReadOnlyArray<Item>
	: never;
