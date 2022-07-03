import { isAsynchronousIterable } from "@vangware/predicates";
import type { AsynchronousIterable } from "@vangware/types";

/**
 * Flattens given iterable a single level.
 *
 * @category Generators
 * @category Reducers
 * @example
 * ```typescript
 * await flat([1, 2, [3, 4]]); // [1, 2, 3, 4]
 * ```
 * @param iterable Iterable to flatten.
 * @yields Flatten items.
 */
export const flat = async function* <Item>(
	iterable: AsynchronousIterable<AsynchronousIterable<Item> | Item>,
) {
	// eslint-disable-next-line functional/no-loop-statement
	for await (const iterableOrItem of iterable) {
		// eslint-disable-next-line functional/no-conditional-statement
		if (isAsynchronousIterable(iterableOrItem)) {
			yield* iterableOrItem;
		} else {
			yield iterableOrItem;
		}
	}
};
