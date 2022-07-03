import type { AsynchronousIterable } from "@vangware/types";
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
export const length = <Item>(iterable: AsynchronousIterable<Item>) =>
	reduce<unknown, number>(() => total => total + 1)(0)(iterable);
