import { isArray } from "@vangware/predicates";
import { reduce } from "./reduce.js";

/**
 * Takes a `separator` string and a iterable and returns a string with the
 * concatenation of all the elements separated by the `separator`.
 *
 * @category Reducers
 * @example
 * ```typescript
 * const joinWithSpaces = join(" ");
 * joinWithSpaces([1, 2, 3]); // "1 2 3"
 * ```
 * @param separator String to use as separator.
 * @returns Curried function with `separator` in context.
 */
export const join =
	(separator: string) =>
	<Item>(iterable: Iterable<Item>) =>
		isArray(iterable)
			? iterable.join(separator)
			: reduce(
					(item: Item) => (string: string | undefined) =>
						`${
							string === undefined ? "" : `${string}${separator}`
						}${item as Item & string}`,
			  )(undefined as unknown as string)(iterable); // Nasty but necessary
