import type { AsynchronousIterable, Reducer } from "@vangware/types";

/**
 * Reducer/Folder function for iterables.
 *
 * @category Reducers
 * @example
 * ```
 * const sum = reduce((item: number) => (total: number) => total + item);
 * const sumFrom0 = sum(0);
 *
 * await sumFrom0([1, 2, 3]); // 6
 * ```
 * @param reducer Reducer function.
 * @returns Curried function with `reducer` in context.
 */
export const reduce =
	<Item, Accumulator>(reducer: Reducer<Item, Accumulator>) =>
	(initialValue: Accumulator) =>
	async (iterable: AsynchronousIterable<Item>): Promise<Accumulator> => {
		// eslint-disable-next-line functional/no-let
		let accumulator: Accumulator = initialValue;

		// eslint-disable-next-line functional/no-loop-statement
		for await (const item of iterable) {
			accumulator = reducer(item)(accumulator);
		}

		return accumulator;
	};
