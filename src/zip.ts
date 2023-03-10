import type { AsynchronousIterable } from "@vangware/types";
import { getIterator } from "./getIterator.js";
import { handleCurriedAsynchronousIterable } from "./handleCurriedAsynchronousIterable.js";

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
export const zip = handleCurriedAsynchronousIterable(
	iterableFirst => iterableSecond =>
		function* () {
			const iteratorSecond = getIterator(iterableSecond);

			// eslint-disable-next-line functional/no-loop-statements
			for (const itemA of iterableFirst) {
				const { done = false, value } = iteratorSecond.next();

				// eslint-disable-next-line functional/no-conditional-statements
				if (done) {
					break;
				}

				yield [itemA, value] as const;
			}
		},
)(
	iterableFirst => iterableSecond =>
		async function* () {
			const iteratorSecond = getIterator(iterableSecond);

			// eslint-disable-next-line functional/no-loop-statements
			for await (const itemA of iterableFirst) {
				const { done = false, value } = await iteratorSecond.next();

				// eslint-disable-next-line functional/no-conditional-statements
				if (done) {
					break;
				}

				yield [itemA, value] as const;
			}
		},
) as <FirstIterable extends AsynchronousIterable>(
	iterableFirst: FirstIterable,
) => <SecondIterable extends AsynchronousIterable>(
	iterableSecond: SecondIterable,
) => FirstIterable extends AsynchronousIterable<infer FirstItem>
	? SecondIterable extends AsynchronousIterable<infer SecondItem>
		? FirstIterable extends AsyncIterable<FirstItem>
			? AsyncIterableIterator<readonly [FirstItem, SecondItem]>
			: SecondIterable extends AsyncIterable<SecondItem>
			? AsyncIterableIterator<readonly [FirstItem, SecondItem]>
			: IterableIterator<readonly [FirstItem, SecondItem]>
		: never
	: never;
