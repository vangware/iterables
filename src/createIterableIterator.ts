import { isIterable } from "@vangware/predicates";
import type { AsynchronousGeneratorFunction } from "./types/AsynchronousGeneratorFunction.js";

/**
 * Takes a generator function and returns an iterable iterator or asynchronous
 * iterable iterator object.
 *
 * @category Common
 * @example
 * ```typescript
 * const identityGenerator = function* (value) { yield value; };
 * const iterableIterator = createIterableIterator(identityGenerator);
 *
 * const fooIdentity = iterableIterator("foo");
 *
 * for (const value of fooIdentity) {
 * 	console.log(value); // "foo"
 * }
 *
 * // Same IterableIterator as above, return values again:
 *
 * for (const value of fooIdentity) {
 * 	console.log(value); // "foo"
 * }
 * ```
 * @param generatorFunction Generator to be used every time `[Symbol.iterator]` is called.
 * @returns Iterable iterator object.
 */
export const createIterableIterator = <
	GeneratorFunction extends AsynchronousGeneratorFunction,
>(
	generatorFunction: GeneratorFunction,
) => {
	const generator = generatorFunction();

	return {
		...generator,
		[Symbol[isIterable(generator) ? "iterator" : "asyncIterator"]]:
			generatorFunction,
	} as GeneratorFunction extends AsynchronousGeneratorFunction<infer Item>
		? GeneratorFunction extends () => AsyncIterator<Item>
			? AsyncIterableIterator<Item>
			: IterableIterator<Item>
		: never;
};
