import type { Tests } from "@vangware/test";
import type { ReadOnlyArray } from "@vangware/types";
import { append } from "../src/append.js";
import { iterableToArray } from "../src/iterableToArray.js";

const appendNumbers = append([0, 1, 2, 3, 4]);

export default [
	{
		given: "an array of numbers an array of strings",
		must: "return both arrays concatenated",
		received: iterableToArray(appendNumbers(["foo", "bar"])),
		wanted: ["foo", "bar", 0, 1, 2, 3, 4],
	},
] as Tests<ReadOnlyArray<number | string>>;
