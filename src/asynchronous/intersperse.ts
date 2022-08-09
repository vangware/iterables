import type { AsynchronousIterable } from "@vangware/types";
import { getIterator } from "../getIterator.js";

/**
 * Add the given `separator` between each element of the given `iterable`.
 *
 * @category Generators
 * @category Mappers
 * @example
 * ```typescript
 * const intersperseComma = intersperse(",");
 * intersperseComma([1, 2, 3]); // [1, ",", 2, ",", 3]
 * ```
 * @param separator Separator to add between each element.
 * @returns Curried function with `separator` in context.
 */
export const intersperse = <Separator>(separator: Separator) =>
	async function* <Item>(iterable: AsynchronousIterable<Item>) {
		const iterator = getIterator(iterable);
		const item = { done: false, ...(await iterator.next()) };

		// eslint-disable-next-line functional/no-loop-statement
		while (!item.done) {
			const next = { done: false, ...(await iterator.next()) };

			yield item.value;

			// eslint-disable-next-line functional/no-conditional-statement
			if (!next.done) {
				yield separator;
			}

			// eslint-disable-next-line functional/immutable-data, functional/no-expression-statement
			Object.assign(item, next);
		}
	};
