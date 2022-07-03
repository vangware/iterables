import type { Tests } from "@vangware/test";
import type { ReadOnlyArray } from "@vangware/types";
import { drop } from "../../src/asynchronous/drop.js";
import { iterableToArray } from "../../src/asynchronous/iterableToArray.js";
import { asyncIterateArray } from "./asyncIterateArray.js";

const drop2 = drop(2);
const dropNone = drop(0);
const dropAll = drop(Infinity);

export default [
	{
		given: "an array of numbers and a drop 2 function",
		must: "return array without the first 2 elements",
		received: iterableToArray(drop2(asyncIterateArray([0, 1, 2, 3, 4]))),
		wanted: [2, 3, 4],
	},
	{
		given: "an array of numbers and a drop 0 function",
		must: "return array with all its elements",
		received: iterableToArray(dropNone(asyncIterateArray([0, 1, 2, 3, 4]))),
		wanted: [0, 1, 2, 3, 4],
	},
	{
		given: "an array of numbers and a drop all function",
		must: "return empty array",
		received: iterableToArray(dropAll(asyncIterateArray([0, 1, 2, 3, 4]))),
		wanted: [],
	},
] as Tests<ReadOnlyArray<number>>;
