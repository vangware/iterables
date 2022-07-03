import type { Tests } from "@vangware/test";
import type { ReadOnlyArray } from "@vangware/types";
import { iterableToArray } from "../../src/asynchronous/iterableToArray.js";
import { take } from "../../src/asynchronous/take.js";
import { asyncIterateArray } from "./asyncIterateArray.js";

const take2 = take(2);
const takeNone = take(0);
const takeAll = take(Infinity);

export default [
	{
		given: "an array of numbers and a take 2 function",
		must: "return array with only the first 2 elements",
		received: iterableToArray(take2(asyncIterateArray([0, 1, 2, 3, 4]))),
		wanted: [0, 1],
	},
	{
		given: "an array of numbers and a take 0 function",
		must: "return an empty array",
		received: iterableToArray(takeNone(asyncIterateArray([0, 1, 2, 3, 4]))),
		wanted: [],
	},
	{
		given: "an array of numbers and a take all function",
		must: "return the whole array",
		received: iterableToArray(takeAll(asyncIterateArray([0, 1, 2, 3, 4]))),
		wanted: [0, 1, 2, 3, 4],
	},
] as Tests<ReadOnlyArray<number>>;
