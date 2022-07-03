import type { Tests } from "@vangware/test";
import { iterableToArray } from "../../src/asynchronous/iterableToArray.js";
import { unique } from "../../src/asynchronous/unique.js";
import { asyncIterateArray } from "./asyncIterateArray.js";

const array = [0, 1, 2, 3, 4];

export default [
	{
		given: "an array with duplicated elements",
		must: "return same array without duplicated elements",
		received: iterableToArray(
			unique(asyncIterateArray([...array, ...array])),
		),
		wanted: array,
	},
	{
		given: "an array without duplicated elements",
		must: "return same array",
		received: iterableToArray(unique(asyncIterateArray(array))),
		wanted: array,
	},
	{
		given: "an empty array",
		must: "return same array",
		received: iterableToArray(unique(asyncIterateArray([]))),
		wanted: [],
	},
] as Tests<ReadonlyArray<number>>;
