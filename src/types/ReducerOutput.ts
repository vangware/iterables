import type { AsynchronousIterable } from "@vangware/types";

/**
 * `AsynchronousIterable` reducer function optional return value.
 */
export type ReducerOutput<
	Iterable extends AsynchronousIterable,
	Output,
> = Iterable extends AsynchronousIterable<infer Item>
	? Iterable extends AsyncIterable<Item>
		? Promise<Output>
		: Output
	: never;
