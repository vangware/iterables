import { isArray } from "@vangware/predicates";
import type { Predicate } from "@vangware/types";

/**
 * Returns the value of the first item in the iterable where predicate is `true`,
 * and `undefined` otherwise.
 *
 * @category Reducers
 * @example
 * ```
 * const findEven = find((number: number) => number % 2 === 0);
 * findEven([1, 2, 3, 4]); // 2
 * findEven([1, 3, 5, 7]); // undefined
 * ```
 * @param predicate Predicate function to search for item.
 * @returns Curried function with `predicate` set in context.
 */
export const find =
	<Item, Predicated extends Item>(predicate: Predicate<Item, Predicated>) =>
	(iterable: Iterable<Item>) => {
		// eslint-disable-next-line functional/no-conditional-statement
		if (isArray(iterable)) {
			return iterable.find(item => predicate(item));
		} else {
			// eslint-disable-next-line functional/no-loop-statement
			for (const item of iterable) {
				// eslint-disable-next-line functional/no-conditional-statement
				if (predicate(item)) {
					return item;
				}
			}

			return undefined;
		}
	};
