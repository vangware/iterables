import type { AsynchronousIterable, Reducer } from "@vangware/types";
import { forEach } from "./forEach.js";
import { maybePromiseHandler } from "./maybePromiseHandler.js";
import type { ReducerOutput } from "./types/ReducerOutput.js";

/**
 * Reducer function for iterables and asynchronous iterables.
 *
 * @category Reducers
 * @example
 * ```
 * const sum = Accumulator<number>(item => total => total + item);
 * const sumFrom0 = sum(0);
 *
 * sumFrom0([1, 2, 3]); // 6
 * ```
 * @param reducer Reducer function.
 * @returns Curried function with `reducer` in context.
 */
export const reduce =
	<Item, Accumulator>(reducer: Reducer<Item, Accumulator>) =>
	(initialValue: Accumulator) =>
	<Iterable extends AsynchronousIterable<Item>>(iterable: Iterable) => {
		// eslint-disable-next-line functional/no-let
		let accumulator: Accumulator = initialValue;

		return maybePromiseHandler(_ => accumulator)(
			forEach((item: Item) => (accumulator = reducer(item)(accumulator)))(
				iterable,
			),
		) as ReducerOutput<Iterable, Accumulator>;
	};
