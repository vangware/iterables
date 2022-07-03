import type { Tests } from "@vangware/test";
import type { ReadOnlyArray } from "@vangware/types";
import { drop } from "../../src/asynchronous/drop.js";
import { initial } from "../../src/asynchronous/initial.js";
import { iterableToArray } from "../../src/asynchronous/iterableToArray.js";
import { range } from "../../src/range.js";
import { asyncIterateArray } from "./asyncIterateArray.js";

export default [
	{
		given: "an array",
		must: "return initial items",
		received: iterableToArray(initial(asyncIterateArray([0, 1, 2]))),
		wanted: [0, 1],
	},
	{
		given: "an iterable",
		must: "return initial items",
		received: iterableToArray(initial(range(1)(0)(2))),
		wanted: [0, 1],
	},
	{
		given: "an empty array",
		must: "return empty array",
		received: iterableToArray(initial([])),
		wanted: [],
	},
	{
		given: "an empty iterable",
		must: "return empty array",
		received: iterableToArray(
			initial(drop(Infinity)(asyncIterateArray([0, 1, 2]))),
		),
		wanted: [],
	},
] as Tests<ReadOnlyArray<number>>;
