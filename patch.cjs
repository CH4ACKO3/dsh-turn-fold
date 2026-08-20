// @ch4acko3/dsh-turn-fold — Harmony Source Patches for the DSH conversation chat flow.
//
// These three patches run in order, in memory only, against the compiled browser
// bundle of @deepseek-ai/dsh-client-ui-conversation (lib/client.js). They never
// modify the installed package.
//
//   1. inject-turn-fold-runtime  — injects the fold renderer + disclosure UI
//      into the module factory, immediately before the ChatView component.
//   2. rewrite-node-render-loop   — replaces the `order.map(...)` node render
//      loop with a call to the injected renderer, which groups a completed
//      turn's agent activity into a collapsible disclosure while keeping the
//      final answer (turn-tail.closing.finalNode) and the turn tail visible.
//   3. install-turn-fold-services — registers the plugin's native DSH locale
//      namespace and binds its native settings scope during conversation boot.
//
// Both selectors are pinned with an exact `expect: 1` and a target version so
// a compiled-shape drift fails loudly in `dsh harmony status`.

const INLINE = require('./inline-source.cjs')

const TARGET = {
  package: '@deepseek-ai/dsh-client-ui-conversation',
  version: '0.1.0-rc.8',
  file: 'lib/client.js',
}

module.exports = [
  {
    id: 'inject-turn-fold-runtime',
    target: TARGET,
    select: 'FunctionDeclaration[name.name="ChatView"], VariableStatement:has(VariableDeclaration[name.name="ChatView"])',
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
      const callback = node.arguments[0]
      if (callback === undefined) throw new Error('@ch4acko3/dsh-turn-fold: order.map callback is missing')
      const renderNode = sourceFile.text.slice(callback.getStart(sourceFile), callback.getEnd())
      edit.overwrite(
        node.getStart(sourceFile),
        node.getEnd(),
        `__ch4acko3DshTurnFoldRender({ order, nodeStore, timeline, sessionId, renderNode: ${renderNode}, t })`
      )
    },
  },
  {
    id: 'install-turn-fold-services',
    target: TARGET,
    select: 'VariableStatement:has(VariableDeclaration[name.name="t"][initializer.expression.name.name="bind"])',
    expect: 1,
    apply({ node, sourceFile, edit }) {
      const statement = sourceFile.text.slice(node.getStart(sourceFile), node.getEnd())
      edit.overwrite(
        node.getStart(sourceFile),
        node.getEnd(),
        `${statement}\n\t\t\t__ch4acko3DshTurnFoldInstall(ctx);`
      )
    },
  },
]
