import { isIterable } from "@vangware/predicates";
import type { AsynchronousIterable } from "@vangware/types";
import { createIterableIterator } from "./createIterableIterator.js";
import type { GeneratorOutput } from "./types/GeneratorOutput.js";

/**
 * Drop the specified amount of items from the given iterable or asynchronous
 * iterable.
 *
 * @category Generators
 * @example
 * ```typescript
 * const drop2 = drop(2);
 * drop2([1, 2, 3, 4, 5]); // [3, 4, 5]
 * ```
 * @param amount Amount of items to drop.
 * @returns Curried function with `amount` in context.
 */
export const drop =
	(amount: bigint | number) =>
	<Iterable extends AsynchronousIterable>(iterable: Iterable) =>
		createIterableIterator(
			isIterable(iterable)
				? function* () {
						// eslint-disable-next-line functional/no-let
						let count = 0n;

						// eslint-disable-next-line functional/no-conditional-statement
						if (amount > 0) {
							// eslint-disable-next-line functional/no-loop-statement
							for (const item of iterable) {
								// eslint-disable-next-line @typescript-eslint/no-unused-expressions
								count >= amount ? yield item : (count += 1n);
							}
						} else {
							yield* iterable;
						}
				  }
				: async function* () {
						// eslint-disable-next-line functional/no-let
						let count = 0n;

						// eslint-disable-next-line functional/no-conditional-statement
						if (amount > 0) {
							// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, functional/no-loop-statement
							for await (const item of iterable as AsyncIterable<unknown>) {
								// eslint-disable-next-line @typescript-eslint/no-unused-expressions
								count >= amount ? yield item : (count += 1n);
							}
						} else {
							// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
							yield* iterable as AsyncIterable<unknown>;
						}
				  },
		) as GeneratorOutput<Iterable>;
