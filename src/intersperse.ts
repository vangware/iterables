import type { AsynchronousIterable } from "@vangware/types";
import { flat } from "./flat.js";
import { initial } from "./initial.js";
import { repeat } from "./repeat.js";
import { zip } from "./zip.js";

/**
 * Add the given `separator` between each element of the given iterable or
 * asynchronous iterable.
 *
 * @category Generators
 * @example
 * ```typescript
 * const intersperseComma = intersperse(",");
 * intersperseComma([1, 2, 3]); // [1, ",", 2, ",", 3]
 * ```
 * @param separator Separator to add between each element.
 * @returns Curried function with `separator` in context.
 */
export const intersperse = <Separator>(separator: Separator) => {
	const repeatSeparator = repeat(separator)(Infinity);

	return <Item>(iterable: AsynchronousIterable<Item>) =>
		initial(flat(zip(iterable)(repeatSeparator)));
};
