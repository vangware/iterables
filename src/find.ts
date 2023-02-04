import { isIterable } from "@vangware/predicates";
import type { AsynchronousIterable, Maybe, Unary } from "@vangware/types";
import type { ReducerOutput } from "./types/ReducerOutput.js";

/**
 * Returns the value of the first item in the iterable or asynchronous iterable
 * where predicate is `true`, `undefined` otherwise.
 *
 * @category Reducers
 * @example
 * ```
 * const findEven = find((number: number) => number % 2 === 0);
 * findEven([1, 2, 3, 4]); // 2
 * findEven([1, 3, 5, 7]); // undefined
 * ```
 * @param predicate Predicate function to search for item.
 * @returns Curried function with `predicate` set in context.
 */
export const find =
	<Item>(predicate: Unary<Item, boolean>) =>
	<Iterable extends AsynchronousIterable<Item>>(iterable: Iterable) =>
		(isIterable(iterable)
			? () => {
					// eslint-disable-next-line functional/no-loop-statements
					for (const item of iterable) {
						// eslint-disable-next-line functional/no-conditional-statements
						if (predicate(item)) {
							return item;
						}
					}

					return undefined;
			  }
			: async () => {
					// eslint-disable-next-line functional/no-loop-statements
					for await (const item of iterable as AsyncIterable<Item>) {
						// eslint-disable-next-line functional/no-conditional-statements
						if (predicate(item)) {
							return item;
						}
					}

					return undefined;
			  })() as ReducerOutput<Iterable, Maybe<Item>>;
