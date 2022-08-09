/**
 * Returns a single instance of each item in the iterable.
 *
 * @category Generators
 * @category Filters
 * @example
 * ```typescript
 * unique([1, 2, 3, 4, 1, 2, 3, 4]); // [1, 2, 3, 4]
 * ```
 * @param iterable Iterable to be filtered.
 * @yields Single instance of each item.
 */
export const unique = function* <Item>(iterable: Iterable<Item>) {
	const set = new Set<Item>();

	// eslint-disable-next-line functional/no-loop-statement
	for (const item of iterable) {
		// eslint-disable-next-line functional/no-conditional-statement
		if (!set.has(item)) {
			// eslint-disable-next-line functional/no-expression-statement
			set.add(item);
			yield item;
		}
	}
};
