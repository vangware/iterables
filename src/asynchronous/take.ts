import type { AsynchronousIterable } from "@vangware/types";

/**
 * Take the given amount of items from the iterable.
 *
 * @category Filters
 * @category Generators
 * @example
 * ```typescript
 * const take2 = take(2);
 * take2([1, 2, 3, 4, 5]); // [1, 2]
 * ```
 * @param amount Amount of items to take.
 * @returns Curried function with `amount` in context.
 */
export const take = (amount: bigint | number) =>
	async function* <Item>(iterable: AsynchronousIterable<Item>) {
		// eslint-disable-next-line functional/no-let
		let count = 0n;

		// eslint-disable-next-line functional/no-loop-statement
		for await (const item of iterable) {
			// eslint-disable-next-line functional/no-conditional-statement
			if (count < amount) {
				yield item;
				// eslint-disable-next-line functional/no-expression-statement
				count += 1n;
			}
		}
	};
