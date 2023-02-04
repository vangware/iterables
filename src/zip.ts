import { isAsyncIterable } from "@vangware/predicates";
import type { AsynchronousIterable } from "@vangware/types";
import { createIterableIterator } from "./createIterableIterator.js";
import { getIterator } from "./getIterator.js";

/**
 * Takes two iterables or asynchronous iterable and returns a new iterable or
 * asynchronous iterable with the length of the shortest iterable with tuples
 * containing the items from both.
 *
 * @category Generators
 * @example
 * ```
 * const zipNumbers = zip([0, 1, 2]);
 * zipNumbers([3, 4, 5]); // [[0, 3], [1, 4], [2, 5]]
 * ```
 * @param iterableFirst One of the iterables to be zipped.
 * @returns Curried function with `iterableFirst` in context.
 */
export const zip = <FirstIterable extends AsynchronousIterable>(
	iterableFirst: FirstIterable,
) => {
	const firstIsAsyncIterable = isAsyncIterable(iterableFirst);

	return <SecondIterable extends AsynchronousIterable>(
		iterableSecond: SecondIterable,
	) =>
		createIterableIterator(
			firstIsAsyncIterable || isAsyncIterable(iterableSecond)
				? async function* () {
						const iteratorSecond = getIterator(iterableSecond);

						// eslint-disable-next-line functional/no-loop-statements
						for await (const itemA of iterableFirst as AsyncIterable<unknown>) {
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							const { done = false, value } = await (
								iteratorSecond as AsyncIterator<unknown>
							).next();

							// eslint-disable-next-line functional/no-conditional-statements
							if (!done) {
								yield [itemA, value];
							} else {
								break;
							}
						}
				  }
				: function* () {
						const iteratorSecond = getIterator(iterableSecond);

						// eslint-disable-next-line functional/no-loop-statements
						for (const itemA of iterableFirst as Iterable<unknown>) {
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							const { done = false, value } =
								iteratorSecond.next();

							// eslint-disable-next-line functional/no-conditional-statements
							if (!done) {
								yield [itemA, value];
							} else {
								break;
							}
						}
				  },
		) as unknown as FirstIterable extends AsynchronousIterable<
			infer FirstItem
		>
			? SecondIterable extends AsynchronousIterable<infer SecondItem>
				? FirstIterable extends AsyncIterable<FirstItem>
					? AsyncIterableIterator<readonly [FirstItem, SecondItem]>
					: SecondIterable extends AsyncIterable<SecondItem>
					? AsyncIterableIterator<readonly [FirstItem, SecondItem]>
					: IterableIterator<readonly [FirstItem, SecondItem]>
				: never
			: never;
};
