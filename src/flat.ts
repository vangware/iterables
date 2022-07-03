import { isAsynchronousIterable } from "@vangware/predicates";

/**
 * Flattens given iterable a single level.
 *
 * @category Generators
 * @category Reducers
 * @example
 * ```typescript
 * flat([1, 2, [3, 4]]); // [1, 2, 3, 4]
 * ```
 * @param iterable Iterable to flatten.
 * @yields Flatten items.
 */
export const flat = function* <Item>(
	iterable: Iterable<Item | Iterable<Item>>,
) {
	// eslint-disable-next-line functional/no-loop-statement
	for (const iterableOrItem of iterable) {
		// eslint-disable-next-line functional/no-conditional-statement
		if (isAsynchronousIterable(iterableOrItem)) {
			yield* iterableOrItem;
		} else {
			yield iterableOrItem;
		}
	}
};
