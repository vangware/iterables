import type { Tests } from "@vangware/test";
import { join } from "../src/join.js";
import { iterateArray } from "./iterateArray.js";

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
		given: "an iterable of numbers",
		must: "return those numbers separated by spaces",
		received: spaceJoin(iterateArray(array)),
		wanted: "0 1 2 3",
	},
] as Tests<string>;
