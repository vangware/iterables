import type { AsynchronousIterable, Predicate } from "@vangware/types";

/**
 * Returns the value of the first item in the iterable where predicate is `true`,
 * and `undefined` otherwise.
 *
 * @category Reducers
 * @example
 * ```
 * const findEven = find((number: number) => number % 2 === 0);
 * await findEven([1, 2, 3, 4]); // 2
 * await findEven([1, 3, 5, 7]); // undefined
 * ```
 * @param predicate Predicate function to search for item.
 * @returns Curried function with `predicate` set in context.
 */
export const find =
	<Item, Predicated extends Item>(predicate: Predicate<Item, Predicated>) =>
	async (iterable: AsynchronousIterable<Item>) => {
		// eslint-disable-next-line functional/no-loop-statement
		for await (const item of iterable) {
			// eslint-disable-next-line functional/no-conditional-statement
			if (predicate(item)) {
				return item;
			}
		}

		return undefined;
	};
