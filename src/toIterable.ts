import {
	hasAsyncIteratorSymbol,
	isIterable,
	isObject,
} from "@vangware/predicates";
import type { AsynchronousIterable } from "@vangware/types";
import { createIterableIterator } from "./createIterableIterator.js";

/**
 * Takes a value, iterable or asynchronous iterable and yields it.
 *
 * @category Generators
 * @example
 * ```typescript
 * const iterable = toIterable(1);
 * const iterator = getIterator(iterable);
 * iterator.next(); // { value: 1, done: false }
 * iterator.next(); // { value: undefined, done: true }
 * ```
 * @param valueOrIterable Vale or iterable to yield.
 * @returns Yielded item or iterable.
 */
export const toIterable = <ValueOrIterable>(valueOrIterable: ValueOrIterable) =>
	createIterableIterator(
		isObject(valueOrIterable) && hasAsyncIteratorSymbol(valueOrIterable)
			? async function* () {
					yield* valueOrIterable as AsyncIterable<unknown>;
			  }
			: function* () {
					// eslint-disable-next-line @typescript-eslint/no-unused-expressions
					isIterable(valueOrIterable)
						? yield* valueOrIterable
						: yield valueOrIterable;
			  },
	) as ValueOrIterable extends AsynchronousIterable<infer Item>
		? Item extends AsyncIterable<Item>
			? AsyncIterableIterator<Item>
			: IterableIterator<Item>
		: Iterable<ValueOrIterable>;
