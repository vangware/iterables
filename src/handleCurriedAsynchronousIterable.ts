import { isAsyncIterable } from "@vangware/predicates";
import type { AsynchronousIterable } from "@vangware/types";
import { createIterableIterator } from "./createIterableIterator.js";

/**
 * Takes a generator for iterables, then a generator for async iterables and
 * last 2 iterables, using the proper generator automatically.
 *
 * @category Common
 * @example
 * ```typescript
 * const handle = handleCurriedAsynchronousIterable(
 * 	iterable2 => iterable1 => function* () {
 * 		yield* iterable2;
 * 		yield* iterable1;
 * 	}
 * )(
 * 	iterable2 => iterable1 => async function* () {
 * 		yield* iterable2;
 * 		yield* iterable1;
 * 	}
 * );
 *
 * handle(nonAsyncIterable)(nonAsyncIterable); // IterableIterator
 * handle(asyncIterable)(nonAsyncIterable); // AsyncIterableIterator
 * ```
 * @param iterator Function to be used with non async iterables.
 * @returns Curried function with iterator in context.
 */
export const handleCurriedAsynchronousIterable =
	<Iterable2Item = unknown, Iterable1Item = unknown, Output = unknown>(
		iterator: (
			iterable2: Iterable<Iterable2Item>,
		) => (
			iterable1: Iterable<Iterable1Item>,
		) => () => Generator<Output, void, void>,
	) =>
	(
		asyncIterator: (
			iterable2: AsynchronousIterable<Iterable2Item>,
		) => (
			iterable1: AsynchronousIterable<Iterable1Item>,
		) => () => AsyncGenerator<Output, void, void>,
	) =>
		(iterable2 => {
			const asyncGenerator2 = asyncIterator(iterable2);

			if (isAsyncIterable(iterable2)) {
				return iterable1 =>
					createIterableIterator(asyncGenerator2(iterable1));
			} else {
				const generator2 = iterator(iterable2);

				return iterable1 =>
					createIterableIterator(
						isAsyncIterable(iterable1)
							? asyncGenerator2(iterable1)
							: generator2(iterable1),
					);
			}
		}) as <Iterable2 extends AsynchronousIterable<Iterable2Item>>(
			iterable2: Iterable2,
		) => <Iterable1 extends AsynchronousIterable<Iterable1Item>>(
			iterable1: Iterable1,
		) => Iterable2 extends AsyncIterable<Iterable2Item>
			? AsyncIterableIterator<Output>
			: Iterable1 extends AsyncIterable<Iterable1Item>
			? AsyncIterableIterator<Output>
			: IterableIterator<Output>;
