import type { Tests } from "@vangware/test";
import type { ReadOnlyRecord } from "@vangware/types";
import { entriesToObject } from "../../src/asynchronous/entriesToObject.js";

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
] as Tests<ReadOnlyRecord<string, string>>;
