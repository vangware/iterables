import type { AsynchronousIterable } from "@vangware/types";

/**
 * Get an iterator instance from an iterable.
 *
 * @category Common
 * @example
 * ```typescript
 * const iterator = getIterator([1, 2, 3]);
 * iterator.next(); // { value: 1, done: false }
 * iterator.next(); // { value: 2, done: false }
 * iterator.next(); // { value: 3, done: false }
 * iterator.next(); // { value: undefined, done: true }
 * ```
 * @param iterable Iterable to get the iterator from.
 * @returns Iterator instance.
 */
export const getIterator = <InputIterable extends AsynchronousIterable>(
	iterable: InputIterable,
) =>
	((iterable as Partial<Iterable<unknown>>)[Symbol.iterator]?.() ??
		(iterable as AsyncIterable<unknown>)[
			Symbol.asyncIterator
		]()) as InputIterable extends AsyncIterable<infer Item>
		? AsyncIterator<Awaited<Item>, Awaited<Item>>
		: InputIterable extends Iterable<infer Item>
		? Iterator<Item, Item>
		: never;
