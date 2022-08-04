import type { Tests } from "@vangware/test";
import { every } from "../src/every.js";
import { iterateArray } from "./iterateArray.js";

const everyNumbers = every(
	(value: unknown): value is number => typeof value === "number",
);
const numbersArray = [0, 1, 2, 3];
const numbersWithStringArray = [0, 1, 2, "foo", 3];

export default [
	{
		given: "an array of numbers",
		must: "return true",
		received: everyNumbers(numbersArray),
		wanted: true,
	},
	{
		given: "an array of numbers with a string on it",
		must: "return false",
		received: everyNumbers(numbersWithStringArray),
		wanted: false,
	},
	{
		given: "an iterable of numbers",
		must: "return true",
		received: everyNumbers(iterateArray(numbersArray)),
		wanted: true,
	},
	{
		given: "an iterable of numbers with a string on it",
		must: "return false",
		received: everyNumbers(iterateArray(numbersWithStringArray)),
		wanted: false,
	},
] as Tests<boolean>;
