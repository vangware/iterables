import { isBoolean } from "@vangware/predicates";
import type { AsynchronousIterable, Predicate } from "@vangware/types";
import { every } from "./every.js";
import type { ReducerOutput } from "./types/ReducerOutput.js";

/**
 * Evaluates items in an iterable or asynchronous iterable against a predicate
 * and returns `true` if any item evaluates to `true`.
 *
 * @category Reducers
 * @example
 * ```
 * const someEven = some((number: number) => number % 2 === 0);
 * someEven([1, 2, 3, 4]); // true
 * someEven([1, 3, 5, 7]); // false
 * ```
 * @param predicate Predicate function to evaluate each item.
 * @returns Curried function with `predicate` set in context.
 */
export const some = <Item, Predicated extends Item = Item>(
	predicate: Predicate<Item, Predicated>,
) => {
	const everyPredicate = every<Item>(item => !predicate(item));

	return <Iterable extends AsynchronousIterable<Item>>(
		iterable: Iterable,
	) => {
		const output = everyPredicate(iterable);

		return (
			isBoolean(output)
				? !(output as unknown as boolean)
				: output.then(result => !result)
		) as ReducerOutput<Iterable, boolean>;
	};
};
