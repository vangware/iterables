import { isIterable } from "@vangware/predicates";
import type { AsynchronousIterable, Predicate } from "@vangware/types";
import type { ReducerOutput } from "./types/ReducerOutput.js";

/**
 * Evaluates items in an iterable or asynchronous iterable against a predicate
 * and returns `true` if all items evaluates to `true`.
 *
 * @category Reducers
 * @example
 * ```typescript
 * const everyEven = every((number: number) => number % 2 === 0);
 * everyEven([2, 4, 6, 8]); // true
 * everyEven([1, 2, 3, 4]); // false
 * ```
 * @param predicate Predicate function to evaluate each item.
 * @returns Curried function with `predicate` set in context.
 */
export const every =
	<Item, Predicated extends Item = Item>(
		predicate: Predicate<Item, Predicated>,
	) =>
	<Iterable extends AsynchronousIterable<Item>>(iterable: Iterable) =>
		(isIterable(iterable)
			? () => {
					// eslint-disable-next-line functional/no-loop-statements
					for (const item of iterable) {
						// eslint-disable-next-line functional/no-conditional-statements
						if (!predicate(item)) {
							return false;
						}
					}

					return true;
			  }
			: async () => {
					// eslint-disable-next-line functional/no-loop-statements
					for await (const item of iterable as AsyncIterable<Item>) {
						// eslint-disable-next-line functional/no-conditional-statements
						if (!predicate(item)) {
							return false;
						}
					}

					return true;
			  })() as ReducerOutput<Iterable, boolean>;
