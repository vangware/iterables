import { isIterable } from "@vangware/predicates";
import type { AsynchronousIterable, Unary } from "@vangware/types";
import { createIterableIterator } from "./createIterableIterator.js";

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
export const map =
	<Item, MappedItem>(mapper: Unary<Item, MappedItem>) =>
	<Iterable extends AsynchronousIterable<Item>>(iterable: Iterable) =>
		createIterableIterator(
			isIterable(iterable)
				? function* () {
						// eslint-disable-next-line functional/no-loop-statement
						for (const item of iterable) {
							yield mapper(item);
						}
				  }
				: async function* () {
						// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, functional/no-loop-statement
						for await (const item of iterable as AsyncIterable<Item>) {
							yield mapper(item);
						}
				  },
		) as Iterable extends AsynchronousIterable<Item>
			? Iterable extends AsyncIterable<Item>
				? AsyncIterableIterator<MappedItem>
				: IterableIterator<MappedItem>
			: never;
