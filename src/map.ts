import type { Unary } from "@vangware/types";

/**
 * Lazy map for iterables.
 *
 * @category Generators
 * @category Mappers
 * @example
 * ```
 * const double = value => value * 2;
 * const mapDouble = map(double);
 *
 * mapDouble([1, 2, 3]); // [2, 4, 6]
 * ```
 * @param mapper Mapper function.
 * @returns Generator function with `mapper` function set in context.
 */
export const map = <Item, MappedItem>(mapper: Unary<Item, MappedItem>) =>
	function* (iterable: Iterable<Item>) {
		// eslint-disable-next-line functional/no-loop-statement
		for (const item of iterable) {
			yield mapper(item);
		}
	};
