# dsh-turn-fold

English | [简体中文](README.zh-CN.md)

[![Powered by Harmony](https://memorax-ai.github.io/dsh-harmony/harmony-powered.svg)](https://memorax-ai.github.io/dsh-harmony/)

A [dsh-harmony](https://github.com/memorax-ai/dsh-harmony) provider that adds
Codex-Desktop-style turn folding to the DSH WebUI conversation.

https://github.com/user-attachments/assets/3c9dfdcf-a454-4750-9edf-76771ed5a9a6

During a turn, the summary bar remains visible while native thinking, notes,
commands, and tool calls keep streaming. Consecutive reasoning and tool activity
share one compact group from the second item onward. When a turn settles, known
Agent activity, including context injection, moves into one disclosure
immediately before the final answer. Its configurable metrics default to wall
time, tool-call count, and input/output tokens, and appear only when the loaded
turn contains enough data to calculate them without guessing.

The final answer is located through `turn-tail.closing.finalNode`, not
`finish_reason` or DOM position. Completed, stopped, and interrupted turns fold,
with distinct status labels for the latter two. A turn remains expanded when
DSH marks its closing branch unavailable, when any later node follows the
closing answer, or while the user has keyboard focus or an active text selection
inside its activity. Failed, max-token, closing-less, and open turns also stay
expanded so errors and unfinished work are never hidden.

Expanding reuses the original native node renderers, so tool details, copy, and
file links keep working. Open turns are remembered per session and turn while
the WebUI remains loaded. The disclosure has keyboard-visible focus, accessible
state and action labels, responsive wrapping, reduced-motion handling, and a
short open/close transition that unmounts the activity after it closes.

## How it works

Three pinned Source Patches run in memory against the compiled browser bundle of
`@deepseek-ai/dsh-client-ui-conversation` (`lib/client.js`); installed DSH files
are never modified.

| Patch | Selector (expect 1) | Effect |
| --- | --- | --- |
| `inject-turn-fold-runtime` | `FunctionDeclaration[name.name="ChatView"], VariableStatement:has(VariableDeclaration[name.name="ChatView"])` | Injects the fold renderer + disclosure UI into either native or decorated `ChatView` |
| `rewrite-node-render-loop` | `CallExpression[expression.name.name="map"][expression.expression.name="order"]` | Replaces the `order.map(...)` node loop with the per-turn renderer |
| `install-turn-fold-services` | `VariableStatement:has(VariableDeclaration[name.name="t"][initializer.expression.name.name="bind"])` | Registers the bundled English and Chinese dictionaries through DSH's native locale service and binds the native settings scope |

## Install

```sh
dsh plugin --profile web add github:CH4ACKO3/dsh-turn-fold
dsh harmony status --profile web   # all three patches must be `bound`
```

## Test

```sh
node test/run.cjs
```

`npm install` installs the dependencies required by the test harness. The test
suite applies all three patches in memory, parses the final browser bundle, and
covers completed, split-activity, post-closing, partial-history, failed,
interrupted, open, accessibility, localization, settings, and state-retention
behavior. A missing target or selector mismatch fails the test; it is never
reported as a skipped pass.

## CI and release

GitHub Actions runs the test suite and a package dry run for every pull request
and every push to `main`. Version tags publish to npm through Trusted Publishing
(OIDC), without a long-lived npm token.

Configure the npm trusted publisher once:

```sh
npx npm@^11.15.0 trust github @ch4acko3/dsh-turn-fold \
  --repo ch4acko3/dsh-turn-fold \
  --file release.yml \
  --allow-publish
```

Then create and push a version tag whose value matches `package.json`:

```sh
npm version patch
git push --follow-tags
```
