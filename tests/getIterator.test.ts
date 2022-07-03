import type { Tests } from "@vangware/test";
import { getIterator } from "../src/getIterator.js";
import { asyncIterateArray } from "./asynchronous/asyncIterateArray.js";

const array = [0, 1, 2];

export default [
	{
		given: "an array",
		must: "return array's iterator",
		received: getIterator(array),
		wanted: array[Symbol.iterator](),
	},
	{
		given: "an async iterable array",
		must: "return array's async iterator",
		received: getIterator(asyncIterateArray(array)),
		wanted: asyncIterateArray(array)[Symbol.asyncIterator](),
	},
] as Tests<AsyncIterableIterator<unknown> | Iterator<unknown>>;
