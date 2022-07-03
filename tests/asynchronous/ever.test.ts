import type { Tests } from "@vangware/test";
import { every } from "../../src/asynchronous/every.js";

const everyNumbers = every(
	(value: unknown): value is number => typeof value === "number",
);

export default [
	{
		given: "an array of numbers",
		must: "return true",
		received: everyNumbers([0, 1, 2, 3]),
		wanted: true,
	},
	{
		given: "an array of numbers with a string on it",
		must: "return false",
		received: everyNumbers([0, 1, 2, "foo", 3]),
		wanted: false,
	},
] as Tests<boolean>;
