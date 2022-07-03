import type { Tests } from "@vangware/test";
import { includes } from "../../src/asynchronous/includes.js";

const includesFoo = includes("foo");

export default [
	{
		given: "a string and an array of strings containing that string",
		must: "return true",
		received: includesFoo(["foo", "bar"]),
		wanted: true,
	},
	{
		given: "a string and an array not containing that string",
		must: "return false",
		received: includesFoo(["baz", "bar"]),
		wanted: false,
	},
] as Tests<boolean>;
