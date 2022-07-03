import { isAsynchronousIterable } from "@vangware/predicates";
import type { AsynchronousIterable } from "@vangware/types";

/**
 * Takes a value and returns an iterable that yields that value.
 *
 * @category Common
 * @category Generators
 * @example
 * ```typescript
 * const iterable = toIterable(1);
 * const iterator = getIterator(iterable);
 * iterator.next(); // { value: 1, done: false }
 * iterator.next(); // { value: undefined, done: true }
 * ```
 * @yields Yielded value.
 * @param item Item or iterable to yield.
 */
export const toIterable = async function* <Item>(
	item: AsynchronousIterable<Item> | Item,
) {
	// eslint-disable-next-line functional/no-conditional-statement
	if (isAsynchronousIterable(item)) {
		yield* item;
	} else {
		yield item;
	}
};
