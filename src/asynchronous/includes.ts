import type { AsynchronousIterable } from "@vangware/types";

/**
 * Tries to find the given `searchItem` in iterable.
 *
 * @category Validators
 * @example
 * ```
 * const includesTwo = includes(2);
 * await includesTwo([1, 2, 3, 4]); // true
 * await includesTwo([1, 3, 5, 7]); // false
 * ```
 * @param searchItem Item to search.
 * @returns Curried function with `predicate` set in context.
 */
export const includes =
	<SearchItem>(searchItem: SearchItem) =>
	async <Item extends SearchItem>(iterable: AsynchronousIterable<Item>) => {
		// eslint-disable-next-line functional/no-loop-statement
		for await (const item of iterable) {
			// eslint-disable-next-line functional/no-conditional-statement
			if (Object.is(searchItem, item)) {
				return true;
			}
		}

		return false;
	};
