import { isIterable } from "@vangware/predicates";
import type { AsynchronousIterable } from "@vangware/types";
import { createIterableIterator } from "./createIterableIterator.js";
import type { GeneratorOutput } from "./types/GeneratorOutput.js";

/**
 * Returns a single instance of each item in the iterable or asynchronous
 * iterable.
 *
 * @category Generators
 * @example
 * ```typescript
 * unique([1, 2, 3, 4, 1, 2, 3, 4]); // [1, 2, 3, 4]
 * ```
 * @param iterable Iterable to be filtered.
 * @returns Generators with a single instance of each item of the iterable.
 */
export const unique = <Iterable extends AsynchronousIterable>(
	iterable: Iterable,
) =>
	createIterableIterator(
		isIterable(iterable)
			? function* () {
					const set = new Set();

					// eslint-disable-next-line functional/no-loop-statement
					for (const item of iterable) {
						// eslint-disable-next-line functional/no-conditional-statement
						if (!set.has(item)) {
							// eslint-disable-next-line functional/no-expression-statement
							set.add(item);
							yield item;
						}
					}
			  }
			: async function* () {
					const set = new Set();

					// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, functional/no-loop-statement
					for await (const item of iterable as AsyncIterable<unknown>) {
						// eslint-disable-next-line functional/no-conditional-statement
						if (!set.has(item)) {
							// eslint-disable-next-line functional/no-expression-statement
							set.add(item);
							yield item;
						}
					}
			  },
	) as GeneratorOutput<Iterable>;
