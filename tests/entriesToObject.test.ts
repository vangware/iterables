import type { Tests } from "@vangware/test";
import type { ReadOnlyRecord } from "@vangware/types";
import { entriesToObject } from "../src/entriesToObject.js";
import { iterateArray } from "./iterateArray.js";

const stringKey = "key";
const numberKey = 1;
const symbolKey = Symbol("key");
const value = "value";

export default [
	{
		given: "an array of entries [string, value]",
		must: "return an object with the shape { string: value }",
		received: entriesToObject([[stringKey, value]]),
		wanted: { [stringKey]: value },
	},
	{
		given: "an array of entries [number, value]",
		must: "return an object with the shape { number: value }",
		received: entriesToObject([[numberKey, value]]),
		wanted: { [numberKey]: value },
	},
	{
		given: "an array of entries [symbol, value]",
		must: "return an object with the shape { symbol: value }",
		received: entriesToObject([[symbolKey, value]]),
		wanted: { [symbolKey]: value },
	},
	{
		given: "an iterable of entries [string, value]",
		must: "return an object with the shape { string: value }",
		received: entriesToObject(iterateArray([[stringKey, value]])),
		wanted: { [stringKey]: value },
	},
	{
		given: "an iterable of entries [number, value]",
		must: "return an object with the shape { number: value }",
		received: entriesToObject(iterateArray([[numberKey, value]])),
		wanted: { [numberKey]: value },
	},
	{
		given: "an iterable of entries [symbol, value]",
		must: "return an object with the shape { symbol: value }",
		received: entriesToObject(iterateArray([[symbolKey, value]])),
		wanted: { [symbolKey]: value },
	},
] as Tests<ReadOnlyRecord<string, string>>;
