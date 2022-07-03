import type { Tests } from "@vangware/test";
import { find } from "../../src/asynchronous/find.js";

const findString = find(
	(value: unknown): value is string => typeof value === "string",
);

export default [
	{
		given: "an array of numbers and strings containing search matching item",
		must: "get the first string that matches",
		received: findString([0, 1, "foo", 2, "bar"]),
		wanted: "foo",
	},
	{
		given: "an array of numbers without search matching item",
		must: "get the first string",
		received: findString([0, 1, 2]),
		wanted: undefined,
	},
] as Tests<string | undefined>;
