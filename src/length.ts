import { isArray } from "@vangware/predicates";
import { reduce } from "./reduce.js";

/**
 * Get the length of an iterable (be careful with infinite iterables).
 *
 * @category Reducers
 * @example
 * ```typescript
 * length([1, 2, 3]); // 3
 * ```
 * @param iterable Iterable to get the length from.
 * @returns Length of the iterable.
 */
export const length = <Item>(iterable: Iterable<Item>) =>
	isArray(iterable)
		? iterable.length
		: reduce<unknown, number>(() => total => total + 1)(0)(iterable);
