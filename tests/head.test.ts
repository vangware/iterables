import type { Tests } from "@vangware/test";
import { drop } from "../src/drop.js";
import { head } from "../src/head.js";
import { range } from "../src/range.js";

const array = [0, 1, 2];

export default [
	{
		given: "an array",
		must: "return array first element",
		received: head(array),
		wanted: 0,
	},
	{
		given: "an iterable",
		must: "return iterable's first element",
		received: head(range(1)(0)(2)),
		wanted: 0,
	},
	{
		given: "an empty array",
		must: "return undefined",
		received: head([]),
		wanted: undefined,
	},
	{
		given: "an empty iterable",
		must: "return undefined",
		received: head(drop(Infinity)(array)),
		wanted: undefined,
	},
] as Tests<number | undefined>;
