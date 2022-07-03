import { isArray } from "@vangware/predicates";

/**
 * Tries to find the given `searchItem` in iterable.
 *
 * @category Validators
 * @example
 * ```
 * const includesTwo = includes(2);
 * includesTwo([1, 2, 3, 4]); // true
 * includesTwo([1, 3, 5, 7]); // false
 * ```
 * @param searchItem Item to search.
 * @returns Curried function with `predicate` set in context.
 */
export const includes =
	<SearchItem>(searchItem: SearchItem) =>
	<Item extends SearchItem>(iterable: Iterable<Item>) => {
		// eslint-disable-next-line functional/no-conditional-statement
		if (isArray(iterable)) {
			// Using `Array.prototype.some` instead of `Array.prototype.includes` so the comparison is made using `Object.is`
			return iterable.some(item => Object.is(searchItem, item));
		} else {
			// eslint-disable-next-line functional/no-loop-statement
			for (const item of iterable) {
				// eslint-disable-next-line functional/no-conditional-statement
				if (Object.is(searchItem, item)) {
					return true;
				}
			}

			return false;
		}
	};
