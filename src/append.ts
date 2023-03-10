import type { AsynchronousIterable } from "@vangware/types";
import { handleCurriedAsynchronousIterable } from "./handleCurriedAsynchronousIterable.js";

/**
 * Appends one iterable or asynchronous iterable to another.
 *
 * @category Generators
 * @example
 * ```typescript
 * const appendNumbers = append([0, 1, 2, 3, 4]);
 *
 * appendNumbers(["foo", "bar"]); // ["foo", "bar", 0, 1, 2, 3, 4]
 * appendNumbers([]); // [0, 1, 2, 3, 4]
 * ```
 * @param tailIterable Iterable or asynchronous to be appended.
 * @returns Curried generator function with `tailIterable` set in context.
 */
export const append = handleCurriedAsynchronousIterable(
	tailIterable => initialIterable =>
		function* () {
			yield* initialIterable;
			yield* tailIterable;
		},
)(
	tailIterable => initialIterable =>
		async function* () {
			yield* initialIterable;
			yield* tailIterable;
		},
) as <TailIterable extends AsynchronousIterable>(
	tailIterable: TailIterable,
) => <InitialIterable extends AsynchronousIterable>(
	initialIterable: InitialIterable,
) => TailIterable extends AsynchronousIterable<infer TailItem>
	? InitialIterable extends AsynchronousIterable<infer InitialItem>
		? TailIterable extends AsyncIterable<TailItem>
			? AsyncIterableIterator<InitialItem | TailItem>
			: InitialIterable extends AsyncIterable<InitialItem>
			? AsyncIterableIterator<InitialItem | TailItem>
			: IterableIterator<InitialItem | TailItem>
		: never
	: never;
