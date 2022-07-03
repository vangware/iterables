import { isArray } from "@vangware/predicates";
import type { Predicate } from "@vangware/types";

/**
 * Evaluates items in an iterable against a predicate and returns `true` if
 * all items evaluates to `true`.
 *
 * @category Validators
 * @example
 * ```typescript
 * const everyEven = every((number: number) => number % 2 === 0);
 * everyEven([2, 4, 6, 8]); // true
 * everyEven([1, 2, 3, 4]); // false
 * ```
 * @param predicate Predicate function to evaluate each item.
 * @returns Curried function with `predicate` set in context.
 */
export const every =
	<Item, Predicated extends Item>(predicate: Predicate<Item, Predicated>) =>
	(iterable: Iterable<Item>) => {
		// eslint-disable-next-line functional/no-conditional-statement
		if (isArray(iterable)) {
			return iterable.every(item => predicate(item));
		} else {
			// eslint-disable-next-line functional/no-loop-statement
			for (const item of iterable) {
				// eslint-disable-next-line functional/no-conditional-statement
				if (!predicate(item)) {
					return false;
				}
			}

			return true;
		}
	};
