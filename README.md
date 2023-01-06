<img alt="Vangware's Iterables logo" src="./logo.svg" height="128" />

![Coverage][coverage-badge] ![License][license-badge]
![NPM Version][npm-version-badge] ![Open Issues][open-issues-badge]

🔁 Iterable and AsyncIterable utils.

## Usage

This package can be installed as a dependency or used directly.

### Usage as ECMAScript module

🦕 In JS or [deno][deno]:

```js
import { map } from "https://esm.sh/@vangware/iterables";

const mapDouble = map((value: number) => value * 2);

[...mapDouble([1, 2, 3])]; // [2, 4, 6]
```

🌎 Or in the browser:

```html
<script type="module">
	import { map } from "https://esm.sh/@vangware/iterables";

	const mapDouble = map((value: number) => value * 2);

	[...mapDouble([1, 2, 3])]; // [2, 4, 6]
</script>
```

### Usage with local installation

First:

```bash
# If you use npm
npm install @vangware/iterables
# If you use pnpm
pnpm add @vangware/iterables
# If you use yarn
yarn add @vangware/iterables
```

And then:

```js
import { map } from "@vangware/iterables";

const mapDouble = map((value: number) => value * 2);

[...mapDouble([1, 2, 3])]; // [2, 4, 6]
```

## Documentation

Documentation is available [HERE][documentation]. It is auto-generated with
[typedoc][typedoc] based on the JSDocs and the types in the source. It shouldn't
be necessary to read this. Code editors like [VS Code][vscode] integrate the
documentation in the UI.

## Changelog

Changelog can be found [HERE][changelog].

## Test coverage

Test coverage can be found [HERE][coverage].

<!-- Reference -->

[changelog]: https://github.com/vangware/iterables/blob/main/CHANGELOG.md
[coverage-badge]:
	https://img.shields.io/coveralls/github/vangware/iterables.svg?style=for-the-badge&labelColor=666&color=0a8&link=https://coveralls.io/github/vangware/iterables
[coverage]: https://coveralls.io/github/vangware/iterables
[deno]: https://deno.land/
[documentation]: https://iterables.vangware.com
[license-badge]:
	https://img.shields.io/npm/l/@vangware/iterables.svg?style=for-the-badge&labelColor=666&color=0a8&link=https://github.com/vangware/iterables/blob/main/LICENSE
[npm-version-badge]:
	https://img.shields.io/npm/v/@vangware/iterables.svg?style=for-the-badge&labelColor=666&color=0a8&link=https://npm.im/@vangware/iterables
[open-issues-badge]:
	https://img.shields.io/github/issues/vangware/iterables.svg?style=for-the-badge&labelColor=666&color=0a8&link=https://github.com/vangware/iterables/issues
[typedoc]: https://typedoc.org/
[vscode]: https://code.visualstudio.com/
