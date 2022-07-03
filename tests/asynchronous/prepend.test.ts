import type { Tests } from "@vangware/test";
import type { ReadOnlyArray } from "@vangware/types";
import { iterableToArray } from "../../src/asynchronous/iterableToArray.js";
import { prepend } from "../../src/asynchronous/prepend.js";

const prependNumbers = prepend([0, 1, 2, 3, 4]);

export default [
	{
		given: "an array of numbers an array of strings",
		must: "return both arrays concatenated",
		received: iterableToArray(prependNumbers(["foo", "bar"])),
		wanted: [0, 1, 2, 3, 4, "foo", "bar"],
	},
] as Tests<ReadOnlyArray<number | string>>;
