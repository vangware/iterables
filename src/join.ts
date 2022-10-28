import type { AsynchronousIterable, Maybe } from "@vangware/types";
import { maybePromiseHandler } from "@vangware/utils";
import { reduce } from "./reduce.js";
import type { ReducerOutput } from "./types/ReducerOutput.js";

/**
 * Takes a `separator` string and a iterable or asynchronous iterable and
 * returns a string with the concatenation of all the elements separated by the
 * `separator`.
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
	<Iterable extends AsynchronousIterable>(iterable: Iterable) =>
		maybePromiseHandler((string: Maybe<string>) => string ?? "")(
			reduce<string, Maybe<string>>(
				item => string =>
					`${string ?? ""}${
						string !== undefined ? separator : ""
					}${item}`,
			)(undefined)(iterable as AsynchronousIterable<string>),
		) as ReducerOutput<Iterable, string>;
