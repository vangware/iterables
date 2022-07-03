import type { Tests } from "@vangware/test";
import { drop } from "../src/drop.js";
import { length } from "../src/length.js";
import { range } from "../src/range.js";

const array = [0, 1, 2];

export default [
	{
		given: "an array",
		must: "return length",
		received: length(array),
		wanted: 3,
	},
	{
		given: "an iterable",
		must: "return length",
		received: length(range(1)(0)(2)),
		wanted: 3,
	},
	{
		given: "an empty array",
		must: "return 0",
		received: length([]),
		wanted: 0,
	},
	{
		given: "an empty iterable",
		must: "return 0",
		received: length(drop(Infinity)(array)),
		wanted: 0,
	},
] as Tests<number>;
