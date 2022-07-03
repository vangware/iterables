import type { Tests } from "@vangware/test";
import { iterableToArray } from "../src/iterableToArray.js";
import { repeat } from "../src/repeat.js";

const repeatTest = repeat("test");

export default [
	{
		given: 'a call to repeat with the string "test" and the number 3',
		must: 'return an array with 3 strings "test" on it',
		received: iterableToArray(repeatTest(3)),
		wanted: ["test", "test", "test"],
	},
] as Tests<ReadonlyArray<string>>;
