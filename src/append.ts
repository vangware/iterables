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
 * @returns Curried generator function with `tailIterable` set in context.
 */
export const append = <TailItem>(tailIterable: Iterable<TailItem>) =>
	function* <InitialItem>(initialIterable: Iterable<InitialItem>) {
		yield* initialIterable;
		yield* tailIterable;
	};
