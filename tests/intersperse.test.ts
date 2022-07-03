import type { Tests } from "@vangware/test";
import type { ReadOnlyArray } from "@vangware/types";
import { drop } from "../src/drop.js";
import { intersperse } from "../src/intersperse.js";
import { iterableToArray } from "../src/iterableToArray.js";
import { range } from "../src/range.js";

const array = [0, 1, 2];
const commaIntersperse = intersperse(",");

export default [
	{
		given: "an array",
		must: "return interspersed items",
		received: iterableToArray(commaIntersperse(array)),
		wanted: [0, ",", 1, ",", 2],
	},
	{
		given: "an iterable",
		must: "return interspersed items",
		received: iterableToArray(commaIntersperse(range(1)(0)(2))),
		wanted: [0, ",", 1, ",", 2],
	},
	{
		given: "an empty array",
		must: "return empty array",
		received: iterableToArray(commaIntersperse([])),
		wanted: [],
	},
	{
		given: "an empty iterable",
		must: "return empty array",
		received: iterableToArray(commaIntersperse(drop(Infinity)(array))),
		wanted: [],
	},
] as Tests<ReadOnlyArray<number | string>>;
