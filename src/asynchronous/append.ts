import type { AsynchronousIterable } from "@vangware/types";

/**
 * Appends iterables.
 *
 * @category Generators
 * @category Reducers
 * @example
 * ```typescript
 * const appendNumbers = append([0, 1, 2, 3, 4]);
 * appendNumbers(["foo", "bar"]); // ["foo", "bar", 0, 1, 2, 3, 4]
 * ```
 * @param tailIterable Iterable to be appended.
 * @returns Curried async generator function with `tailIterable` set in context.
 */
export const append = <TailItem>(
	tailIterable: AsynchronousIterable<TailItem>,
) =>
	async function* <InitialItem>(
		initialIterable: AsynchronousIterable<InitialItem>,
	) {
		yield* initialIterable;
		yield* tailIterable;
	};
