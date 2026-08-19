# dsh-turn-fold

A [dsh-harmony](https://github.com/memorax-ai/dsh-harmony) provider that adds
Codex-Desktop-style turn folding to the DSH WebUI conversation.

During a turn, the native thinking summary, intermediate notes, commands, and
tool calls keep streaming unchanged. When a turn completes, known Agent
activity moves into one compact disclosure immediately before the final answer.
The row reports wall time, tool-call count, and output tokens only when the
loaded turn contains enough data to calculate each metric without guessing.

The final answer is located through `turn-tail.closing.finalNode`, not
`finish_reason` or DOM position. A turn remains expanded when DSH marks its
closing branch unavailable, when any later node follows the closing answer, or
while the user has keyboard focus or an active text selection inside its
activity. Failed, interrupted, max-token, closing-less, and open turns also stay
expanded so errors and unfinished work are never hidden.

Expanding reuses the original native node renderers, so tool details, copy, and
file links keep working. Open turns are remembered per session and turn while
the WebUI remains loaded. The disclosure has keyboard-visible focus, accessible
state and action labels, responsive wrapping, reduced-motion handling, and a
short open/close transition that unmounts the activity after it closes.

## How it works

Two pinned Source Patches run in memory against the compiled browser bundle of
`@deepseek-ai/dsh-client-ui-conversation` (`lib/client.js`); installed DSH files
are never modified.

| Patch | Selector (expect 1) | Effect |
| --- | --- | --- |
| `inject-turn-fold-runtime` | `FunctionDeclaration[name.name="ChatView"]` | Injects the fold renderer + disclosure UI into the module factory |
| `rewrite-node-render-loop` | `CallExpression[expression.name.name="map"][expression.expression.name="order"]` | Replaces the `order.map(...)` node loop with the per-turn renderer |

## Install

```sh
dsh plugin --profile web add ./dsh-turn-fold
dsh harmony status --profile web   # both patches must be `bound`
```

## Test

```sh
node test/run.cjs
```

`npm install` installs test-only copies of the pinned DSH conversation package,
TypeScript, and TSQuery. The test suite applies both patches in memory, parses
the final browser bundle, and covers completed, split-activity, post-closing,
partial-history, failed, interrupted, open, accessibility, and state-retention
behavior. A missing target or selector mismatch fails the test; it is never
reported as a skipped pass.
