import type { Tests } from "@vangware/test";
import type { ReadOnlyArray } from "@vangware/types";
import { iterableToArray } from "../../src/asynchronous/iterableToArray.js";
import { zip } from "../../src/asynchronous/zip.js";
import { asyncIterateArray } from "./asyncIterateArray.js";

const zipFooBar = zip(["foo", "bar"]);

export default [
	{
		given: "zip empty array",
		must: "return empty array",
		received: iterableToArray(zipFooBar([])),
		wanted: [],
	},
	{
		given: "zip with 2 strings an array with 2 numbers",
		must: "zip numbers and strings",
		received: iterableToArray(zipFooBar([1, 2])),
		wanted: [
			["foo", 1],
			["bar", 2],
		],
	},
	{
		given: "zip with 2 strings and array with 1 string",
		must: "zip strings to shortests length",
		received: iterableToArray(zipFooBar(["baz"])),
		wanted: [["foo", "baz"]],
	},
	{
		given: "zip empty async array",
		must: "return empty array",
		received: iterableToArray(zipFooBar(asyncIterateArray([]))),
		wanted: [],
	},
	{
		given: "zip with 2 strings an async array with 2 numbers",
		must: "zip numbers and strings",
		received: iterableToArray(zipFooBar(asyncIterateArray([1, 2]))),
		wanted: [
			["foo", 1],
			["bar", 2],
		],
	},
	{
		given: "zip with 2 strings and async array with 1 string",
		must: "zip strings to shortests length",
		received: iterableToArray(zipFooBar(asyncIterateArray(["baz"]))),
		wanted: [["foo", "baz"]],
	},
] as Tests<
	| ReadOnlyArray<readonly [string, number]>
	| ReadOnlyArray<readonly [string, string]>
>;
