import { isIterable } from "@vangware/predicates";
import type { AsynchronousIterable } from "@vangware/types";

/**
 * Get a `Symbol.iterator` from an iterable or a `Symbol.asyncIterator` from an
 * asynchronous iterable.
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
export const getIterator = <Iterable extends AsynchronousIterable>(
	iterable: Iterable,
) =>
	(iterable as AsyncIterable<unknown>)[
		Symbol[
			isIterable(iterable) ? "iterator" : "asyncIterator"
		] as keyof AsyncIterable<unknown>
	]() as Iterable extends AsynchronousIterable<infer Item>
		? Iterable extends AsyncIterator<Item>
			? AsyncIterableIterator<Item>
			: Iterator<Item>
		: never;
