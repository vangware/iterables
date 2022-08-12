import { isAsynchronousIterable, isIterable } from "@vangware/predicates";
import type { AsynchronousIterable } from "@vangware/types";
import { createIterableIterator } from "./createIterableIterator.js";

/**
 * Flattens one level of the given iterable or asynchronous iterable.
 *
 * @category Generators
 * @example
 * ```typescript
 * flat([1, 2, [3, 4]]); // [1, 2, 3, 4]
 * ```
 * @param iterable Iterable to flatten.
 * @returns Iterable with flatten items.
 */
export const flat = <Iterable extends AsynchronousIterable>(
	iterable: Iterable,
) =>
	createIterableIterator(
		isIterable(iterable)
			? function* () {
					// eslint-disable-next-line functional/no-loop-statement
					for (const iterableOrItem of iterable) {
						// eslint-disable-next-line functional/no-conditional-statement
						if (isIterable(iterableOrItem)) {
							yield* iterableOrItem;
						} else {
							yield iterableOrItem;
						}
					}
			  }
			: async function* () {
					// eslint-disable-next-line functional/no-loop-statement, @typescript-eslint/no-unnecessary-type-assertion
					for await (const iterableOrItem of iterable as AsyncIterable<unknown>) {
						// eslint-disable-next-line functional/no-conditional-statement
						if (isAsynchronousIterable(iterableOrItem)) {
							yield* iterableOrItem;
						} else {
							yield iterableOrItem;
						}
					}
			  },
	) as Iterable extends AsynchronousIterable<infer Item>
		? Item extends AsynchronousIterable<infer SubItem>
			? Item extends AsyncIterable<SubItem>
				? AsyncIterableIterator<SubItem>
				: IterableIterator<SubItem>
			: Iterable extends AsyncIterable<Item>
			? AsyncIterableIterator<Item>
			: IterableIterator<Item>
		: never;
