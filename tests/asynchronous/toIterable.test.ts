import type { Tests } from "@vangware/test";
import type { ReadOnlyArray } from "@vangware/types";
import { iterableToArray } from "../../src/asynchronous/iterableToArray.js";
import { toIterable } from "../../src/asynchronous/toIterable.js";

export default [
	{
		given: "an array",
		must: "return iterable of array",
		received: iterableToArray(toIterable([0, 1, 2, 3, 4])),
		wanted: [0, 1, 2, 3, 4],
	},
	{
		given: "a string",
		must: "return iterable of string",
		received: typeof toIterable("test")[Symbol.asyncIterator],
		wanted: "function",
	},
	{
		given: "a number",
		must: "return iterable of number",
		received: iterableToArray(toIterable(1)),
		wanted: [1],
	},
] as Tests<ReadOnlyArray<number> | string>;
