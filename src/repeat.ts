import { createIterableIterator } from "./createIterableIterator.js";

/**
 * Repeat given item the specified amount of times (can be `BigInt` or
 * `Infinity` times) as an iterable.
 *
 * @category Generators
 * @example
 * ```typescript
 * const repeatFoo = repeat("foo");
 * repeatFoo(3); // ["foo", "foo", "foo"]
 * ```
 * @param item Item to repeat.
 * @returns Curried function with `item` in context.
 */
export const repeat =
	<Item>(item: Item) =>
	(times: bigint | number) =>
		createIterableIterator(function* () {
			// eslint-disable-next-line functional/no-let, functional/no-loop-statements
			for (let count = 0n; count < times; count += 1n) {
				yield item;
			}
		});
