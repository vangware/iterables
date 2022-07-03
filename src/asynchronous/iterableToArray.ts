import { isArray } from "@vangware/predicates";
import type { AsynchronousIterable, ReadOnlyArray } from "@vangware/types";
import { reduce } from "./reduce.js";

/**
 * Turns given `iterable` into an array.
 *
 * @category Reducers
 * @example
 * ```typescript
 * await iterableToArray([1, 2, 3, 4]); // [1, 2, 3, 4]
 * ```
 * @param iterable Iterable to be turned into an array.
 * @returns Array made of iterable items.
 */
export const iterableToArray = async <Item>(
	iterable: AsynchronousIterable<Item>,
) =>
	isArray(iterable)
		? iterable
		: reduce((item: Item) => (array: ReadOnlyArray<Item>) => [
				...array,
				item,
		  ])([])(iterable);
