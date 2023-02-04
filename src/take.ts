import { isIterable } from "@vangware/predicates";
import type { AsynchronousIterable } from "@vangware/types";
import { createIterableIterator } from "./createIterableIterator.js";
import type { GeneratorOutput } from "./types/GeneratorOutput.js";

/**
 * Take the given amount of items from the iterable or asynchronous iterable.
 *
 * @category Generators
 * @example
 * ```typescript
 * const take2 = take(2);
 * take2([1, 2, 3, 4, 5]); // [1, 2]
 * ```
 * @param amount Amount of items to take.
 * @returns Curried function with `amount` in context.
 */
export const take =
	(amount: bigint | number) =>
	<Iterable extends AsynchronousIterable>(iterable: Iterable) =>
		createIterableIterator(
			isIterable(iterable)
				? function* () {
						// eslint-disable-next-line functional/no-let
						let count = 0n;

						// eslint-disable-next-line functional/no-loop-statements
						for (const item of iterable) {
							// eslint-disable-next-line functional/no-conditional-statements
							if (count < amount) {
								yield item;
								// eslint-disable-next-line functional/no-expression-statements
								count += 1n;
							}
						}
				  }
				: async function* () {
						// eslint-disable-next-line functional/no-let
						let count = 0n;

						// eslint-disable-next-line functional/no-loop-statements
						for await (const item of iterable as AsyncIterable<unknown>) {
							// eslint-disable-next-line functional/no-conditional-statements
							if (count < amount) {
								yield item;
								// eslint-disable-next-line functional/no-expression-statements
								count += 1n;
							}
						}
				  },
		) as GeneratorOutput<Iterable>;
