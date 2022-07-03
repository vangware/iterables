import type { Predicate } from "@vangware/types";

/**
 * Filters items in an iterable against a predicate and returns items that
 * evaluated to `true`.
 *
 * @category Filters
 * @category Generators
 * @example
 * ```
 * const filterEven = filter((number: number) => number % 2 === 0);
 * filterEven([1, 2, 3, 4]); // [2, 4]
 * filterEven([1, 3, 5, 7]); // []
 * ```
 * @param predicate Predicate function to evaluate each item.
 * @returns Curried function with `predicate` set in context.
 */
export const filter = <Item, Filtered extends Item>(
	predicate: Predicate<Item, Filtered>,
) =>
	function* (iterable: Iterable<Item>) {
		// eslint-disable-next-line functional/no-loop-statement
		for (const item of iterable) {
			// eslint-disable-next-line functional/no-conditional-statement
			if (predicate(item)) {
				yield item;
			}
		}
	};
