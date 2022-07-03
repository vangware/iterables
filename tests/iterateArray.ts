import type { ReadOnlyArray } from "@vangware/types";

/**
 * Generate an iterable from an array for tests.
 *
 * @example
 * ```typescript
 * const array = [0, 1, 2, 3, 4];
 * const iterable = iterableArray(array);
 * for (const item of iterable) {
 * 	console.log(item);
 * }
 * ```
 * @yields Items of the array.
 */
export const iterateArray = function* <Item>(array: ReadOnlyArray<Item>) {
	yield* array;
};
