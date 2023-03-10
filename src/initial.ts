import type {
	AsynchronousIterable,
	Initial,
	ReadOnlyArray,
} from "@vangware/types";
import { getIterator } from "./getIterator.js";
import { handleAsynchronousIterable } from "./handleAsynchronousIterable.js";
import type { GeneratorOutput } from "./types/GeneratorOutput.js";

/**
 * Get all elements except the last one of an iterable or asynchronous iterable.
 *
 * @category Generators
 * @example
 * ```typescript
 * initial([1, 2, 3]); // [1, 2]
 * ```
 * @param iterable Iterable to get the items from.
 * @returns Iterable with all items except the last one.
 */
export const initial = handleAsynchronousIterable(
	iterable =>
		function* () {
			const iterator = getIterator(iterable);
			const item = { done: false, ...iterator.next() };

			// eslint-disable-next-line functional/no-loop-statements
			while (!item.done) {
				const next = { done: false, ...iterator.next() };

				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				next.done ? undefined : yield item.value;

				// eslint-disable-next-line functional/immutable-data, functional/no-expression-statements
				Object.assign(item, next);
			}
		},
)(
	iterable =>
		async function* () {
			const iterator = getIterator(iterable);
			const item = {
				done: false,
				...(await iterator.next()),
			};

			// eslint-disable-next-line functional/no-loop-statements
			while (!item.done) {
				const next = {
					done: false,
					...(await iterator.next()),
				};

				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				next.done ? undefined : yield item.value;

				// eslint-disable-next-line functional/immutable-data, functional/no-expression-statements
				Object.assign(item, next);
			}
		},
) as <Iterable extends AsynchronousIterable>(
	iterable: Iterable,
) => Iterable extends ReadOnlyArray
	? IterableIterator<Initial<Iterable>[number]>
	: GeneratorOutput<Iterable>;
