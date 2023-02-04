import type {
	AsynchronousIterable,
	Head,
	ReadOnlyArray,
} from "@vangware/types";
import { maybePromiseHandler } from "@vangware/utils";
import { getIterator } from "./getIterator.js";
import type { GeneratorOutput } from "./types/GeneratorOutput.js";

/**
 * Get first element of an iterable or asynchronous iterable (`undefined` if
 * it is empty).
 *
 * @category Reducers
 * @example
 * ```typescript
 * head([1, 2, 3]); // 1
 * ```
 * @param iterable Iterable to get the first element from.
 * @returns First element of the iterable (`undefined` if empty).
 */
export const head = <Iterable extends AsynchronousIterable>(
	iterable: Iterable,
) =>
	maybePromiseHandler(
		({
			value,
		}: Readonly<Pick<IteratorResult<unknown, unknown>, "value">>) => value,
	)(getIterator(iterable).next()) as Iterable extends ReadOnlyArray
		? Head<Iterable>
		: GeneratorOutput<Iterable>;
