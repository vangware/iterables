import type { Tests } from "@vangware/test";
import { count } from "../src/count.js";

const countEvens = count((number: number) => number % 2 === 0);
const countAll = count(() => true);

export default [
	{
		given: "an array of mixed numbers and an even counter",
		must: "return amount of even numbers in the array",
		received: countEvens([0, 1, 2, 3, 4]),
		wanted: 3,
	},
	{
		given: "an empty array and an even counter",
		must: "return 0",
		received: countEvens([]),
		wanted: 0,
	},
	{
		given: "an array of odd numbers and an even counter",
		must: "return 0",
		received: countEvens([1, 3, 5, 7]),
		wanted: 0,
	},
	{
		given: "an array of mixed numbers and a counter with no filter",
		must: "return 0",
		received: countAll([0, 1, 2, 3, 4]),
		wanted: 5,
	},
] as Tests<number>;
