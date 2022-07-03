/**
 * Repeat given item the specified amount of times.
 *
 * @category Common
 * @category Generators
 * @example
 * ```typescript
 * const repeatFoo = repeat("foo");
 * repeatFoo(3); // ["foo", "foo", "foo"]
 * ```
 * @param item Item to repeat.
 * @returns Curried function with `item` in context.
 */
export const repeat = <Item>(item: Item) =>
	function* (times: bigint | number) {
		// eslint-disable-next-line functional/no-let, functional/no-loop-statement
		for (let count = 0; count < times; count += 1) {
			yield item;
		}
	};
