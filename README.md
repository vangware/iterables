<img id="logo" alt="Iterables by Vangware" src="./logo.svg" height="128" />

![Coverage][coverage-badge] ![License][license-badge]
![NPM Version][npm-version-badge] ![Open Issues][open-issues-badge]

🔁 Iterable and AsyncIterable utils.

## Usage

### 📦 Node

Install `@vangware/iterables` as a dependency:

```bash
pnpm add @vangware/iterables
# or
npm install @vangware/iterables
# or
yarn add @vangware/iterables
```

Import it and use it:

```typescript
import { map } from "@vangware/iterables";

const mapDouble = map((value: number) => value * 2);

[...mapDouble([1, 2, 3])]; // [2, 4, 6]
```

### 🦕 Deno

Import `@vangware/iterables` using the `npm:` prefix, and use it directly:

```typescript
import { map } from "npm:@vangware/iterables";

const mapDouble = map((value: number) => value * 2);

[...mapDouble([1, 2, 3])]; // [2, 4, 6]
```

### 🌎 Browser

Import `@vangware/iterables` using [esm.sh][esm.sh], and use it directly:

```html
<script type="module">
	import { map } from "https://esm.sh/@vangware/iterables";

	const mapDouble = map(value => value * 2);

	[...mapDouble([1, 2, 3])]; // [2, 4, 6]
</script>
```

## Useful links

-   📝 [Documentation][documentation]: TypeDoc generated documentation.
-   ⏳ [Changelog][changelog]: List of changes between versions.
-   ✅ [Tests Coverage][coverage]: Coveralls page with tests coverage.

<!-- Reference -->

[changelog]: https://github.com/vangware/iterables/blob/main/CHANGELOG.md
[coverage-badge]:
	https://img.shields.io/coveralls/github/vangware/iterables.svg?style=for-the-badge&labelColor=666&color=0a8&link=https://coveralls.io/github/vangware/iterables
[coverage]: https://coveralls.io/github/vangware/iterables
[documentation]: https://iterables.vangware.com
[esm.sh]: https://esm.sh
[license-badge]:
	https://img.shields.io/npm/l/@vangware/iterables.svg?style=for-the-badge&labelColor=666&color=0a8&link=https://github.com/vangware/iterables/blob/main/LICENSE
[npm-version-badge]:
	https://img.shields.io/npm/v/@vangware/iterables.svg?style=for-the-badge&labelColor=666&color=0a8&link=https://npm.im/@vangware/iterables
[open-issues-badge]:
	https://img.shields.io/github/issues/vangware/iterables.svg?style=for-the-badge&labelColor=666&color=0a8&link=https://github.com/vangware/iterables/issues
