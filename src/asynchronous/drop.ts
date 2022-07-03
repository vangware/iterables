import type { AsynchronousIterable } from "@vangware/types";

/**
 * Drop the specified amount of items from the iterable.
 *
 * @category Generators
 * @category Filters
 * @example
 * ```typescript
 * const drop2 = drop(2);
 * drop2([1, 2, 3, 4, 5]); // [3, 4, 5]
 * ```
 * @param amount Amount of items to drop.
 * @returns Curried function with `amount` in context.
 */
export const drop = (amount: bigint | number) =>
	async function* <Item>(iterable: AsynchronousIterable<Item>) {
		// eslint-disable-next-line functional/no-conditional-statement
		if (amount > 0) {
			// eslint-disable-next-line functional/no-let
			let count = 0n;

			// eslint-disable-next-line functional/no-loop-statement
			for await (const item of iterable) {
				// eslint-disable-next-line functional/no-conditional-statement
				if (count >= amount) {
					yield item;
				} else {
					count += 1n;
				}
			}
		} else {
			yield* iterable;
		}
	};
