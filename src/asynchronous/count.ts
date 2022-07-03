import type { AsynchronousIterable, Predicate } from "@vangware/types";
import { filter } from "./filter.js";
import { length } from "./length.js";

/**
 * Gets the amount of elements that match the given predicate.
 *
 * @category Reducers
 * @example
 * ```typescript
 * const countOdds = count((number: number) => number % 2 !== 1);
 * countOdds([1, 2, 3, 4, 5]); // 3
 * countOdds([0, 2, 4, 6, 8]); // 0
 * ```
 * @param predicate Predicate function for items to be counted.
 * @returns Curried function with `predicate` in context.
 */
export const count =
	<Item>(predicate: Predicate<Item>) =>
	(iterable: AsynchronousIterable<Item>) =>
		length(filter(predicate)(iterable));
