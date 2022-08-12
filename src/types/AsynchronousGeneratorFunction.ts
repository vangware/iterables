/**
 * Function that returns an iterator or an asynchronous iterator.
 */
export type AsynchronousGeneratorFunction<Item = unknown> =
	| (() => AsyncIterator<Item>)
	| (() => Iterator<Item>);
