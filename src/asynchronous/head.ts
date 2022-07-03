import { isArray } from "@vangware/predicates";
import type {
	AsynchronousIterable,
	AsynchronousIterableItem,
	Head,
	ReadOnlyArray,
} from "@vangware/types";
import { getIterator } from "../getIterator.js";

/**
 * Get first element of an iterable.
 *
 * @category Filters
 * @category Reducers
 * @example
 * ```typescript
 * head([1, 2, 3]); // 1
 * ```
 * @param iterable Iterable to get the first element from.
 * @returns First element of the iterable (`undefined` if empty).
 */
export const head = async <Input extends AsynchronousIterable | ReadOnlyArray>(
	iterable: Input,
) =>
	(isArray(iterable)
		? iterable[0]
		: (await getIterator(iterable).next())
				.value) as Input extends ReadOnlyArray
		? Head<Input>
		: AsynchronousIterableItem<Input>;
