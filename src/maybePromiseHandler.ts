import type { MaybePromise } from "@vangware/types";
import { isPromise } from "util/types";

/**
 * If the given value is a promise, the `handler` is called when is resolved,
 * otherwise the handler is called directly with the value.
 *
 * @category Internal
 * @example
 * ```tyepescript
 * const double = maybePromiseHandler((value: number) => value * 2);
 *
 * double(2); // 4
 * double(Promise.resolve(2)); // Promise<4>
 * ```
 * @param handler Handler function to be called with the value.
 * @returns Curried function with `handler` in context.
 */
export const maybePromiseHandler =
	<Value, Output>(handler: (maybePromise: Value) => Output) =>
	<MaybePromiseValue extends MaybePromise<Value>>(
		maybePromise: MaybePromiseValue,
	) =>
		(isPromise(maybePromise)
			? (maybePromise as Promise<Value>).then(handler)
			: handler(
					maybePromise as Value,
			  )) as MaybePromiseValue extends Promise<Value>
			? Promise<Output>
			: Output;
