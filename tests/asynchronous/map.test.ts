import type { Tests } from "@vangware/test";
import type { ReadOnlyArray } from "@vangware/types";
import { iterableToArray } from "../../src/asynchronous/iterableToArray.js";
import { map } from "../../src/asynchronous/map.js";
import { range } from "../../src/range.js";
import { asyncIterateArray } from "./asyncIterateArray.js";

const array = [0, 1, 2, 3];
const mapDouble = map((value: number) => value * 2);

export default [
	{
		given: "an array of numbers and a map that doubles",
		must: "get an array with all values duplicated",
		received: iterableToArray(mapDouble(asyncIterateArray(array))),
		wanted: [0, 2, 4, 6],
	},
	{
		given: "an iterable of numbers and a map that doubles",
		must: "get an array with all values duplicated",
		received: iterableToArray(mapDouble(range(1)(0)(3))),
		wanted: [0, 2, 4, 6],
	},
] as Tests<ReadOnlyArray<number>>;
