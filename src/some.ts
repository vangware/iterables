import { isArray } from "@vangware/predicates";
import type { Predicate } from "@vangware/types";

/**
 * Evaluates items in an iterable against a predicate and returns `true` if any
 * item evaluates to `true`.
 *
 * @category Validators
 * @example
 * ```
 * const someEven = some((number: number) => number % 2 === 0);
 * someEven([1, 2, 3, 4]); // true
 * someEven([1, 3, 5, 7]); // false
 * ```
 * @param predicate Predicate function to evaluate each item.
 * @returns Curried function with `predicate` set in context.
 */
export const some =
	<Item, Predicated extends Item>(predicate: Predicate<Item, Predicated>) =>
	(iterable: Iterable<Item>) => {
		// eslint-disable-next-line functional/no-conditional-statement
		if (isArray(iterable)) {
			return iterable.some(item => predicate(item));
		} else {
			// eslint-disable-next-line functional/no-loop-statement
			for (const item of iterable) {
				// eslint-disable-next-line functional/no-conditional-statement
				if (predicate(item)) {
					return true;
				}
			}

			return false;
		}
	};
