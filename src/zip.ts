import { getIterator } from "./getIterator.js";

/**
 * Takes two iterables and returns a new iterable with tuples containing the
 * items from both iterables.
 *
 * @category Generators
 * @category Mappers
 * @example
 * ```
 * const zipNumbers = zip([0, 1, 2]);
 * zipNumbers([3, 4, 5]); // [[0, 3], [1, 4], [2, 5]]
 * ```
 * @param iterableA One of the iterables to be zipped.
 * @returns Curried function with `iterableA` in context.
 */
export const zip = <ItemA>(iterableA: Iterable<ItemA>) =>
	function* <ItemB>(iterableB: Iterable<ItemB>) {
		const iteratorB = getIterator(iterableB);

		// eslint-disable-next-line functional/no-loop-statement
		for (const itemA of iterableA) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const { done = false, value } = iteratorB.next();

			// eslint-disable-next-line functional/no-conditional-statement
			if (!done) {
				yield [itemA, value] as const;
			} else {
				break;
			}
		}
	};
