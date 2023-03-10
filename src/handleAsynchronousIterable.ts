import { isIterable } from "@vangware/predicates";
import type { AsynchronousIterable } from "@vangware/types";
import { createIterableIterator } from "./createIterableIterator.js";

/**
 * Takes a generator for iterables, then a generator for async iterables and
 * last an iterable, using the proper generator automatically.
 *
 * @category Common
 * @example
 * ```typescript
 * const handle = handleCurriedAsynchronousIterable(
 * 	iterable => function* () {
 * 		yield* iterable;
 * 	}
 * )(
 * 	iterable => async function* () {
 * 		yield* iterable;
 * 	}
 * );
 *
 * handle(nonAsyncIterable); // IterableIterator
 * handle(asyncIterable); // AsyncIterableIterator
 * ```
 * @param iterator Function to be used with non async iterables.
 * @returns Curried function with iterator in context.
 */
export const handleAsynchronousIterable =
	<Item = unknown, Output = unknown>(
		iterator: (
			iterable: Iterable<Item>,
		) => () => Generator<Output, void, void>,
	) =>
	(
		asyncIterator: (
			iterable: AsyncIterable<Item>,
		) => () => AsyncGenerator<Output, void, void>,
	) =>
	<Iterable extends AsynchronousIterable<Item>>(iterable: Iterable) =>
		createIterableIterator(
			isIterable(iterable) ? iterator(iterable) : asyncIterator(iterable),
		) as Iterable extends AsyncIterable<Item>
			? AsyncIterableIterator<Output>
			: IterableIterator<Output>;
