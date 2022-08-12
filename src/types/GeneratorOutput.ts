import type { AsynchronousIterable } from "@vangware/types";

/**
 * `AsynchronousIterable` generator function optional return value.
 */
export type GeneratorOutput<Iterable> = Iterable extends AsynchronousIterable<
	infer Item
>
	? Iterable extends AsyncIterable<Item>
		? AsyncIterableIterator<Item>
		: IterableIterator<Item>
	: never;
