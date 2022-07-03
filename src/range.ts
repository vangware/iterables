/**
 * Range generator (from `from` to `to`).
 *
 * @category Common
 * @category Generators
 * @example
 * ```typescript
 * [...range(1)(0)(5)]; // [0, 1, 2, 3, 4, 5]
 * [...range(1)(5)(0)]; // [5, 4, 3, 2, 1, 0]
 * ```
 * @param step Step size.
 * @returns Curried function with `step` set in context.
 */
export const range =
	<Step extends bigint | number>(step: Step) =>
	(from: Step extends bigint ? bigint : number) =>
		function* (to: Step extends bigint ? bigint : number) {
			// eslint-disable-next-line functional/no-let
			let current = from as number;

			yield current;

			// eslint-disable-next-line functional/no-conditional-statement
			if (from < to) {
				// eslint-disable-next-line functional/no-loop-statement
				while (current + (step as number) <= to) {
					yield (current += step as number);
				}
			} else {
				// eslint-disable-next-line functional/no-loop-statement
				while (current - (step as number) >= to) {
					yield (current -= step as number);
				}
			}
		};
