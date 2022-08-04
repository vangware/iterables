import type { Tests } from "@vangware/test";
import { iterableToArray } from "../src/iterableToArray.js";
import { unique } from "../src/unique.js";

const array = [0, 1, 2, 3, 4];

export default [
	{
		given: "an array with duplicated elements",
		must: "return same array without duplicated elements",
		received: iterableToArray(unique([...array, ...array])),
		wanted: array,
	},
	{
		given: "an array without duplicated elements",
		must: "return same array",
		received: iterableToArray(unique(array)),
		wanted: array,
	},
	{
		given: "an empty array",
		must: "return same array",
		received: iterableToArray(unique([])),
		wanted: [],
	},
] as Tests<ReadonlyArray<number>>;
