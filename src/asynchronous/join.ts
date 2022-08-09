import type { AsynchronousIterable } from "@vangware/types";

/**
 * Takes a `separator` string and a iterable and returns a string with the
 * concatenation of all the elements separated by the `separator`.
 *
 * @category Reducers
 * @example
 * ```typescript
 * const joinWithSpaces = join(" ");
 * await joinWithSpaces([1, 2, 3]); // "1 2 3"
 * ```
 * @param separator String to use as separator.
 * @returns Curried function with `separator` in context.
 */
export const join =
	(separator: string) =>
	async <Item>(iterable: AsynchronousIterable<Item>) => {
		// eslint-disable-next-line functional/no-let
		let string = "";

		// eslint-disable-next-line functional/no-loop-statement
		for await (const item of iterable) {
			// eslint-disable-next-line functional/no-expression-statement
			string += `${item as unknown as string}${separator}`;
		}

		return string.slice(0, -separator.length);
	};
