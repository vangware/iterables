import type { Tests } from "@vangware/test";
import { join } from "../../src/asynchronous/join.js";
import { asyncIterateArray } from "./asyncIterateArray.js";

const spaceJoin = join(" ");
const array = [0, 1, 2, 3];

export default [
	{
		given: "an array of numbers",
		must: "return those numbers separated by spaces",
		received: spaceJoin(array),
		wanted: "0 1 2 3",
	},
	{
		given: "an empty array",
		must: "return empty string",
		received: spaceJoin([]),
		wanted: "",
	},
	{
		given: "an empty iterable",
		must: "return empty string",
		received: spaceJoin(asyncIterateArray([])),
		wanted: "",
	},
] as Tests<string>;
