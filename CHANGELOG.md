# Change log

All notable changes to this project will be documented in this file.

-   This project adheres to [Semantic Versioning][semver].
-   This project uses [Gitmoji][gitmoji]

## 3.1.0

-   🏗️ some changes in `count`, `every`, `filter`, `some`,
    `handleCurriedIsomorphicIterable`, `handleIsomorphicIterable` and
    `IsomorphicGeneratorFunction` types.
-   ⬆️ dependency upgrade.

## 3.0.12

-   ⬆️ dependency upgrade.

## 3.0.11

-   ⬆️ dependency upgrade.

## 3.0.10

-   ⬆️ dependency upgrade.

## 3.0.9

-   ⬆️ dependency upgrade.

## 3.0.8

-   🔧 back to `node@>=20` babyyyy!

## 3.0.7

-   ⬆️ dependency upgrade.
-   🔧 update `engines` to suggest `node@>=19` and `pnpm@>=8`.
-   ✅ update test using `satisfies` instead of `as`.

## 3.0.6

-   ⬆️ dependency upgrade.
-   📝 update `README.md`.

## 3.0.5

-   ⬆️ dependency upgrade.

## 3.0.4

-   ⬆️ dependency upgrade.

## 3.0.3

-   ⬆️ dependency upgrade.

## 3.0.2

-   ⬆️ dependency upgrade.
-   🔧 docs are now generated in CI.

## 3.0.1

-   ⬆️ dependency upgrade.
-   🏗 update `toIterable` types an util usage.

## 3.0.0

-   ⬆️ dependency upgrade.
-   🚚 rename `handleAsynchronousIterable` to `handleIsomorphicIterable`.
-   🚚 rename `handleCurriedAsynchronousIterable` to
    `handleCurriedIsomorphicIterable`.
-   🚚 rename `AsynchronousGeneratorFunction` to `IsomorphicGeneratorFunction`.
-   ✨ add new `ReadOnlyAsyncIterable` type.
-   ✨ add new `ReadOnlyAsyncIterableIterator` type.
-   ✨ add new `ReadOnlyAsyncIterator` type.
-   ✨ add new `ReadOnlyIterable` type.
-   ✨ add new `ReadOnlyIterableIterator` type.
-   ✨ add new `ReadOnlyIterator` type.
-   ✨ add new `ReducerOutput` type.
-   🏗 change `repeat` to take amount first.

## 2.3.0

-   ⬆️ dependency upgrade.
-   ✨ add new `handleAsynchronousIterable` util for internal use mainly (takes
    a generator for iterables, then a generator for async iterables and last an
    iterable, using the proper generator automatically).
-   ✨ add new `handleCurriedAsynchronousIterable` util (same as
    `handleAsynchronousIterable` but for multiple iterables).
-   🏗 update `append` to use `handleCurriedAsynchronousIterable`.
-   🏗 update `drop` to use `handleAsynchronousIterable`.
-   🏗 update `every` to use `whenIsIterable`.
-   🏗 update `filter` to use `handleAsynchronousIterable`.
-   🏗 update `find` to use `whenIsIterable`.
-   🏗 update `flat` to use `handleAsynchronousIterable`.
-   🐛 fix `getIterator` types.
-   🏗 update `initial` to use `handleAsynchronousIterable`.
-   🏗 update `map` to use `handleAsynchronousIterable`.
-   🏗 update `repeat` to use `BigInt` for count.
-   🏗 update `take` to use `handleAsynchronousIterable`.
-   🏗 update `unique` to use `handleAsynchronousIterable`.
-   🏗 update `zip` to use `handleCurriedAsynchronousIterable`.

## 2.2.10

-   ⬆️ dependency upgrade.

## 2.2.9

-   ⬆️ dependency upgrade.

## 2.2.8

-   ⬆️ dependency upgrade.
-   🔥 remove `.editorconfig`.
-   🔧 update configs with new `@vangware/configs`.

## 2.2.7

-   ⬆️ dependency upgrade.
-   🚨 lint fixes.
-   🔧 update CI configs.

## 2.2.6

-   ⬆️ dependency upgrade.

## 2.2.5

-   ⬆️ dependency upgrade.
-   ✏️ fix typo in `package.json`.

## 2.2.4

-   ⬆️ dependency upgrade.

## 2.2.3

-   ⬆️ dependency upgrade.

## 2.2.2

-   ⬆️ dependency upgrade.

## 2.2.1

-   ⬆️ dependency upgrade.

## 2.2.0

-   ⬆️ dependency upgrade.
-   🏗 some changes here and there using `@vangware/utils`.

## 2.1.8

-   ⬆️ dependency upgrade.
-   📝 update `CHANGELOG.md` to use emojis instead of aliases.

## 2.1.7

-   ⬆️ dependency upgrade.

## 2.1.6

-   ⬆️ dependency upgrade.

## 2.1.5

-   ⬆️ dependency upgrade.

## 2.1.4

-   ⬆️ dependency upgrade.

## 2.1.3

-   ⬆️ dependency upgrade.
-   🔧 add `"sideEffects": false` to `package.json`.

## 2.1.2

-   ⬆️ dependency upgrade.
-   📝 update docs.

## 2.1.1

-   ⬆️ dependency upgrade.

## 2.1.0

-   ⬆️ dependency upgrade.
-   ✨ add `zipIndex` util.

## 2.0.2

-   ⬆️ dependency upgrade.
-   ✅ update test for latest `@vangware/test`.

## 2.0.1

-   🐛 fix bad import.
-   🏗 improve `iterableToArray` so is smaller.
-   🏗 improve `entriesToObject` to reduce into an object with no prototype.
-   🏗 improve `groupBy` to reduce into an object with no prototype.

## 2.0.0

-   ⬆️ dependency upgrade.
-   🔥 remove all asynchronous utils (the regular utils handle the async cases
    as well now).
-   📝 update docs.
-   🏗 Functions now return an IteratorIterable so it can be reused.
-   🏗 Some reuse and perf optimizations.

## 1.0.3

-   ⬆️ dependency upgrade.

## 1.0.2

-   ⬆️ dependency upgrade.

## 1.0.1

-   🐛 fix bug with `join` returning `undefined`.

## 1.0.0

-   🎉 Initial commit.

<!-- References -->

[gitmoji]: https://gitmoji.dev/
[semver]: https://semver.org/
