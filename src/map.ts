import type { AsynchronousIterable, Unary } from "@vangware/types";
import { handleAsynchronousIterable } from "./handleAsynchronousIterable.js";

/**
 * Map for iterables and asynchronous iterables.
 *
 * @category Generators
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
	handleAsynchronousIterable<Item, MappedItem>(
		iterable =>
			function* () {
				// eslint-disable-next-line functional/no-loop-statements
				for (const item of iterable) {
					yield mapper(item);
				}
			},
	)(
		iterable =>
			async function* () {
				// eslint-disable-next-line functional/no-loop-statements
				for await (const item of iterable) {
					yield mapper(item);
				}
			},
	) as <Iterable extends AsynchronousIterable<Item>>(
		iterable: Iterable,
	) => Iterable extends AsyncIterable<Item>
		? AsyncIterableIterator<MappedItem>
		: IterableIterator<MappedItem>;
