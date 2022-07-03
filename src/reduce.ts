import { isArray } from "@vangware/predicates";
import type { Reducer } from "@vangware/types";
import { forEach } from "./forEach.js";

/**
 * Reducer/Folder for iterables.
 *
 * @category Reducers
 * @example
 * ```
 * const sum = reduce<number>(item => total => total + item);
 * const sumFrom0 = sum(0);
 *
 * sumFrom0([1, 2, 3]); // 6
 * ```
 * @param reducer Reducer function.
 * @returns Curried function with `reducer` in context.
 */
export const reduce =
	<Item, Accumulator = Item>(reducer: Reducer<Item, Accumulator>) =>
	(initialValue: Accumulator) =>
	(iterable: Iterable<Item>): Accumulator => {
		// eslint-disable-next-line functional/no-conditional-statement
		if (isArray(iterable)) {
			return iterable.reduce(
				(accumulator, item) => reducer(item)(accumulator),
				initialValue,
			);
		} else {
			// eslint-disable-next-line functional/no-let
			let accumulator: Accumulator = initialValue;

			forEach((item: Item) => (accumulator = reducer(item)(accumulator)))(
				iterable,
			);

			return accumulator;
		}
	};
