import type { Tests } from "@vangware/test";
import type { ReadOnlyArray } from "@vangware/types";
import { iterableToArray } from "../src/iterableToArray.js";
import { repeat } from "../src/repeat.js";
import { zipIndex } from "../src/zipIndex.js";

export default [
	{
		given: "an array with two strings",
		must: "return Iterable of tuples with indexes and strings",
		received: () => iterableToArray(zipIndex(["foo", "bar"])),
		wanted: () => [
			[0, "foo"],
			[1, "bar"],
		],
	},
	{
		given: "an empty array",
		must: "Empty iterable",
		received: () => iterableToArray(zipIndex([])),
		wanted: () => [],
	},
	{
		given: "an iterable of strings",
		must: "return Iterable of tuples with indexes and strings",
		received: () => iterableToArray(zipIndex(repeat(2)("foo"))),
		wanted: () => [
			[0, "foo"],
			[1, "foo"],
		],
	},
] as Tests<ReadOnlyArray<readonly [number, unknown]>>;
