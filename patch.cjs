// dsh-turn-fold — Harmony Source Patches for the DSH conversation chat flow.
//
// These two patches run in order, in memory only, against the compiled browser
// bundle of @deepseek-ai/dsh-client-ui-conversation (lib/client.js). They never
// modify the installed package.
//
//   1. inject-turn-fold-runtime  — injects the fold renderer + disclosure UI
//      into the module factory, immediately before the ChatView component.
//   2. rewrite-node-render-loop   — replaces the `order.map(...)` node render
//      loop with a call to the injected renderer, which groups a completed
//      turn's agent activity into a collapsible disclosure while keeping the
//      final answer (turn-tail.closing.finalNode) and the turn tail visible.
//
// Both selectors are pinned with an exact `expect: 1` and a target version so
// a compiled-shape drift fails loudly in `dsh harmony status`.

const INLINE = require('./inline-source.cjs')

const TARGET = {
  package: '@deepseek-ai/dsh-client-ui-conversation',
  version: '0.1.0-rc.7',
  files: ['lib/client.js'],
}

module.exports = [
  {
    id: 'inject-turn-fold-runtime',
    target: TARGET,
    select: 'FunctionDeclaration[name.name="ChatView"]',
    expect: 1,
    apply({ node, sourceFile, edit }) {
      edit.prependLeft(node.getStart(sourceFile), INLINE + '\n\n')
    },
  },
  {
    id: 'rewrite-node-render-loop',
    target: TARGET,
    select: 'CallExpression[expression.name.name="map"][expression.expression.name="order"]',
    expect: 1,
    apply({ node, sourceFile, edit }) {
      edit.overwrite(
        node.getStart(sourceFile),
        node.getEnd(),
        '__dshTurnFoldRender({ order, nodeStore, timeline, sessionId, seat: { useSession, selectedCallId, cwd, openFile, inspectCall, forkAt, loadImage, fileMentions, renderSlot, t } })'
      )
    },
  },
]
