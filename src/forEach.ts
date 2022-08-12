import { isIterable } from "@vangware/predicates";
import type { AsynchronousIterable, Unary } from "@vangware/types";
import type { ReducerOutput } from "./types/ReducerOutput.js";

/**
 * For each function for iterables and asynchronous iterables.
 *
 * @category Common
 * @example
 * ```typescript
 * const logEach = forEach(console.log);
 *
 * logEach([1, 2, 3]); // Logs 1, 2 and 3 separately
 * ```
 * @param callback Function to be called for every item of the iterable.
 * @returns Curried function that expects an iterable to loop over and has `callback` set in context.
 */
export const forEach =
	<Item>(callback: Unary<Item, void>) =>
	<Iterable extends AsynchronousIterable<Item>>(iterable: Iterable) =>
		(isIterable(iterable)
			? () => {
					// eslint-disable-next-line functional/no-loop-statement
					for (const item of iterable) {
						callback(item);
					}
			  }
			: async () => {
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, functional/no-loop-statement
					for await (const item of iterable as AsyncIterable<Item>) {
						callback(item);
					}
			  })() as ReducerOutput<Iterable, void>;
