import type { AsynchronousIterable } from "@vangware/types";
import { getIterator } from "../getIterator.js";

/**
 * Takes two iterables and returns a new iterable with tuples containing the
 * items from both iterables.
 *
 * @category Generators
 * @category Mappers
 * @example
 * ```
 * const zipNumbers = zip([0, 1, 2]);
 * await zipNumbers([3, 4, 5]); // [[0, 3], [1, 4], [2, 5]]
 * ```
 * @param iterableA One of the iterables to be zipped.
 * @returns Curried async generator function with `iterableA` in context.
 */
export const zip = <ItemA>(iterableA: AsynchronousIterable<ItemA>) =>
	async function* <ItemB>(iterableB: AsynchronousIterable<ItemB>) {
		const iteratorB = getIterator(iterableB);

		// eslint-disable-next-line functional/no-loop-statement
		for await (const itemA of iterableA) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const { done = false, value } = await iteratorB.next();

			// eslint-disable-next-line functional/no-conditional-statement
			if (!done) {
				yield [itemA, value as Awaited<ItemB>] as const;
			} else {
				break;
			}
		}
	};
