import type { AsynchronousIterable, Predicate } from "@vangware/types";
import { whenIsIterable } from "@vangware/utils";
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
export const every = <Item, Predicated extends Item = Item>(
	predicate: Predicate<Item, Predicated>,
) =>
	whenIsIterable(iterable => {
		// eslint-disable-next-line functional/no-loop-statements
		for (const item of iterable) {
			// eslint-disable-next-line functional/no-conditional-statements
			if (!predicate(item as Item)) {
				return false;
			}
		}

		return true;
	})(async (iterable: AsyncIterable<Item>) => {
		// eslint-disable-next-line functional/no-loop-statements
		for await (const item of iterable) {
			// eslint-disable-next-line functional/no-conditional-statements
			if (!predicate(item)) {
				return false;
			}
		}

		return true;
	}) as <Iterable extends AsynchronousIterable<Item>>(
		iterable: Iterable,
	) => ReducerOutput<Iterable, boolean>;
