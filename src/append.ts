import { isAsyncIterable } from "@vangware/predicates";
import type {
	AsynchronousIterable,
	AsynchronousIterableItem,
} from "@vangware/types";
import { createIterableIterator } from "./createIterableIterator.js";

/**
 * Appends one iterable or asynchronous iterable to another.
 *
 * @category Generators
 * @example
 * ```typescript
 * const appendNumbers = append([0, 1, 2, 3, 4]);
 *
 * appendNumbers(["foo", "bar"]); // ["foo", "bar", 0, 1, 2, 3, 4]
 * appendNumbers([]); // [0, 1, 2, 3, 4]
 * ```
 * @param tailIterable Iterable or asynchronous to be appended.
 * @returns Curried generator function with `tailIterable` set in context.
 */
export const append = <TailIterable extends AsynchronousIterable>(
	tailIterable: TailIterable,
) => {
	const tailIsAsyncIterable = isAsyncIterable(tailIterable);

	return <InitialIterable extends AsynchronousIterable>(
		initialIterable: InitialIterable,
	) =>
		createIterableIterator(
			tailIsAsyncIterable || isAsyncIterable(initialIterable)
				? // eslint-disable-next-line @typescript-eslint/require-await
				  (async function* () {
						yield* initialIterable;
						yield* tailIterable;
				  } as () => AsyncGenerator<
						AsynchronousIterableItem<InitialIterable | TailIterable>
				  >)
				: (function* () {
						yield* initialIterable;
						yield* tailIterable;
				  } as () => Generator<
						Iterable<InitialIterable | TailIterable>
				  >),
		) as TailIterable extends AsynchronousIterable<infer TailItem>
			? InitialIterable extends AsynchronousIterable<infer InitialItem>
				? TailIterable extends AsyncIterable<TailItem>
					? AsyncIterableIterator<InitialItem | TailItem>
					: InitialIterable extends AsyncIterable<InitialItem>
					? AsyncIterableIterator<InitialItem | TailItem>
					: IterableIterator<InitialItem | TailItem>
				: never
			: never;
};
