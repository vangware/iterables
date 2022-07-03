import type { AsynchronousIterable, Unary } from "@vangware/types";

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
 * await mapDouble([1, 2, 3]); // [2, 4, 6]
 * ```
 * @param mapper Mapper function.
 * @returns Curried generator async function with `mapper` set in context.
 */
export const map = <Item, MappedItem>(mapper: Unary<Item, MappedItem>) =>
	async function* (iterable: AsynchronousIterable<Item>) {
		// eslint-disable-next-line functional/no-loop-statement
		for await (const item of iterable) {
			yield mapper(item);
		}
	};
