import type {
	AsynchronousIterable,
	AsynchronousIterableItem,
	Initial,
	ReadOnlyArray,
} from "@vangware/types";
import { getIterator } from "../getIterator.js";

/**
 * Get all elements except the last one of an iterable.
 *
 * @category Filters
 * @category Generators
 * @example
 * ```typescript
 * initial([1, 2, 3]); // [1, 2]
 * ```
 * @param iterable Iterable to get the items from.
 * @yields Items of the iterable (excluding the last one).
 */
export const initial = async function* <
	Input extends AsynchronousIterable<unknown> | ReadOnlyArray,
>(iterable: Input) {
	const iterator = getIterator(iterable);
	const item = { done: false, ...(await iterator.next()) };

	// eslint-disable-next-line functional/no-loop-statement
	while (!item.done) {
		const next = { done: false, ...(await iterator.next()) };

		// eslint-disable-next-line functional/no-conditional-statement
		if (!next.done) {
			yield item.value as Input extends ReadOnlyArray
				? Initial<Input>[number]
				: AsynchronousIterableItem<Input>;
		}

		// eslint-disable-next-line functional/immutable-data, functional/no-expression-statement
		Object.assign(item, next);
	}
};
