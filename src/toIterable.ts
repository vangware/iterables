import { isAsynchronousIterable } from "@vangware/predicates";

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
export const toIterable = function* <Item>(item: Item | Iterable<Item>) {
	// eslint-disable-next-line functional/no-conditional-statement
	if (isAsynchronousIterable(item)) {
		yield* item;
	} else {
		yield item;
	}
};
