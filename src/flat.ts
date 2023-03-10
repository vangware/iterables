import { isAsynchronousIterable, isIterable } from "@vangware/predicates";
import type { AsynchronousIterable } from "@vangware/types";
import { handleAsynchronousIterable } from "./handleAsynchronousIterable.js";

/**
 * Flattens one level of the given iterable or asynchronous iterable.
 *
 * @category Generators
 * @example
 * ```typescript
 * flat([1, 2, [3, 4]]); // [1, 2, 3, 4]
 * ```
 * @param iterable Iterable to flatten.
 * @returns Iterable with flatten items.
 */
export const flat = handleAsynchronousIterable(
	iterable =>
		function* () {
			// eslint-disable-next-line functional/no-loop-statements
			for (const iterableOrItem of iterable) {
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				isIterable(iterableOrItem)
					? yield* iterableOrItem
					: yield iterableOrItem;
			}
		},
)(
	iterable =>
		async function* () {
			// eslint-disable-next-line functional/no-loop-statements
			for await (const iterableOrItem of iterable) {
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				isAsynchronousIterable(iterableOrItem)
					? yield* iterableOrItem
					: yield iterableOrItem;
			}
		},
) as <Iterable extends AsynchronousIterable>(
	iterable: Iterable,
) => Iterable extends AsynchronousIterable<infer Item>
	? Item extends AsynchronousIterable<infer SubItem>
		? Item extends AsyncIterable<SubItem>
			? AsyncIterableIterator<SubItem>
			: IterableIterator<SubItem>
		: Iterable extends AsyncIterable<Item>
		? AsyncIterableIterator<Item>
		: IterableIterator<Item>
	: never;
