'use strict'

const fs = require('node:fs')
const path = require('node:path')
const assert = require('node:assert')
const ts = require('typescript')
const { tsquery } = require('@phenomnomnominal/tsquery')

const ROOT = path.join(__dirname, '..')
const INLINE = require(path.join(ROOT, 'inline-source.cjs'))
const PATCHES = require(path.join(ROOT, 'patch.cjs'))
const TARGET_PACKAGE = require.resolve('@deepseek-ai/dsh-client-ui-conversation/package.json', { paths: [ROOT] })
const TARGET_ROOT = path.dirname(TARGET_PACKAGE)
const TARGET_PATH = path.join(TARGET_ROOT, 'lib/client.js')

let passed = 0
let failed = 0

function test(name, fn) {
  try {
    fn()
    passed++
    process.stdout.write(`ok - ${name}\n`)
  } catch (error) {
    failed++
    process.stdout.write(`FAIL - ${name}\n`)
    process.stdout.write(`  ${error && error.message ? error.message : error}\n`)
    if (error && error.stack) {
      for (const line of error.stack.split('\n').slice(1, 4)) process.stdout.write(`  ${line}\n`)
    }
  }
}

function deepEqual(actual, expected, message) {
  assert.deepStrictEqual(actual, expected, message)
}

function sourceFile(name, source) {
  return ts.createSourceFile(name, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS)
}

function applyPatch(source, patch) {
  const sf = sourceFile(TARGET_PATH, source)
  const nodes = tsquery(sf, patch.select)
  deepEqual(nodes.length, patch.expect, `${patch.id}: expected ${patch.expect} selector match, got ${nodes.length}`)
  const edits = []
  const edit = {
    prependLeft(at, text) {
      edits.push({ start: at, end: at, text })
    },
    overwrite(start, end, text) {
      edits.push({ start, end, text })
    },
  }
  for (const node of nodes) patch.apply({ node, sourceFile: sf, edit })
  edits.sort((left, right) => right.start - left.start || right.end - left.end)
  let result = source
  for (const candidate of edits) {
    result = result.slice(0, candidate.start) + candidate.text + result.slice(candidate.end)
  }
  return result
}

// ---- Published target and transformed bundle --------------------------------

test('target: package version stays pinned to the published DSH target', () => {
  const manifest = JSON.parse(fs.readFileSync(TARGET_PACKAGE, 'utf8'))
  deepEqual(manifest.version, PATCHES[0].target.version)
  deepEqual(PATCHES[1].target.version, PATCHES[0].target.version)
})

const targetSource = fs.readFileSync(TARGET_PATH, 'utf8')
let transformedSource = targetSource
for (const patch of PATCHES) transformedSource = applyPatch(transformedSource, patch)

test('selectors: injected runtime does not re-match the render-loop selector', () => {
  const nodes = tsquery(sourceFile('inline.js', INLINE), PATCHES[1].select)
  deepEqual(nodes.length, 0)
})

test('transform: final browser bundle parses without syntax errors', () => {
  const sf = sourceFile('client.patched.js', transformedSource)
  deepEqual(sf.parseDiagnostics.length, 0)
  assert.match(transformedSource, /__dshTurnFoldRender\(\{ order, nodeStore, timeline, sessionId,/)
})

// ---- Runtime sandbox ---------------------------------------------------------

function formatDuration(ms) {
  const total = Math.floor(ms / 1000)
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  return minutes > 0 ? `${minutes}m ${String(seconds).padStart(2, '0')}s` : `${seconds}s`
}

function compactTokens(value) {
  if (value >= 1e6) return `${Math.round(value / 1e5) / 10}M`
  if (value >= 1e3) return `${Math.round(value / 100) / 10}K`
  return String(value)
}

function buildSandbox() {
  const jsx = (type, props, key) => ({ __el: 'jsx', type, props: props || {}, key })
  const jsxs = (type, props, key) => ({ __el: 'jsxs', type, props: props || {}, key })
  const ChatNodeSeat = { __seat: true }
  const react = {
    useState(initial) {
      return [typeof initial === 'function' ? initial() : initial, () => {}]
    },
    useRef(initial) {
      return { current: initial }
    },
    useEffect() {},
  }
  const factory = new Function(
    'react',
    'react_jsx_runtime',
    'ChatNodeSeat',
    'formatRunDuration',
    'formatTokens',
    `${INLINE}\nreturn { render: __dshTurnFoldRender, disclosure: __dshTurnFoldDisclosure, seat: __dshTurnFoldSeat, metrics: __dshTurnFoldPlanMetrics, outputTokens: __dshTurnFoldOutputTokens };`,
  )
  const api = factory(react, { jsx, jsxs }, ChatNodeSeat, formatDuration, compactTokens)
  return { api, ChatNodeSeat }
}

function turnLocation(turn, status, startTime, endTime, reason = 'completed') {
  return {
    turn,
    status,
    start: startTime === undefined ? undefined : { time: startTime },
    end: endTime === undefined ? undefined : { time: endTime, data: { reason: { kind: reason } } },
  }
}

function nodeStoreFrom(nodes) {
  const map = new Map()
  for (const node of nodes) map.set(node.key, node)
  return { get: (key) => map.get(key) }
}

function timelineFrom(turns) {
  const map = new Map()
  for (const turn of turns) map.set(turn.turn, turn)
  return { turns: map }
}

function classify(out, api, ChatNodeSeat) {
  return out.map((element) => {
    if (element.type === api.disclosure) return { kind: 'disclosure', key: element.key, props: element.props }
    if (element.type === ChatNodeSeat) return { kind: 'seat', nodeKey: element.props.nodeKey }
    return { kind: 'other', type: element.type }
  })
}

function completedFixture(options = {}) {
  const turn = turnLocation(1, 'closed', options.startTime ?? 1000, options.endTime ?? 85000)
  const nodes = [
    { key: 'user', kind: 'user', location: { kind: 'session' }, data: {} },
    { key: 'think', kind: 'assistant-step', location: { kind: 'step', turn }, data: { finalNode: { seq: 10 }, usage: { outputTokens: 500 } } },
    { key: 'tool-1', kind: 'tool-call', location: { kind: 'step', turn }, data: { root: {} } },
    { key: 'steering', kind: 'steering', location: { kind: 'step', turn }, data: { content: 'continue' } },
    { key: 'tool-2', kind: 'tool-call', location: { kind: 'step', turn }, data: { root: {} } },
    { key: 'answer', kind: 'assistant-step', location: { kind: 'step', turn }, data: { finalNode: { seq: 20 }, usage: { outputTokens: 900 } } },
    { key: 'tail', kind: 'turn-tail', location: { kind: 'turn', turn }, data: { turn: 1, closing: { finalNode: { seq: 20 } }, branchUnavailable: options.branchUnavailable === true } },
  ]
  return { turn, nodes, order: nodes.map((node) => node.key) }
}

test('fold: one disclosure collects activity split by a steering node', () => {
  const { api, ChatNodeSeat } = buildSandbox()
  const fixture = completedFixture()
  const out = api.render({
    order: fixture.order,
    nodeStore: nodeStoreFrom(fixture.nodes),
    timeline: timelineFrom([fixture.turn]),
    sessionId: 'session-a',
    seat: {},
  })
  const result = classify(out, api, ChatNodeSeat)
  deepEqual(result.map((item) => item.kind), ['seat', 'seat', 'disclosure', 'seat', 'seat'])
  deepEqual(result.map((item) => item.nodeKey).filter(Boolean), ['user', 'steering', 'answer', 'tail'])
  deepEqual(result[2].props.activity, ['think', 'tool-1', 'tool-2'])
  deepEqual(result[2].props.durationMs, 84000)
  deepEqual(result[2].props.toolCount, 2)
  deepEqual(result[2].props.tokenCount, 1400)
  deepEqual(result[2].props.foldKey, 'session-a:1')
  deepEqual(result[2].key, 'dsh-turn-fold-session-a-1')
})

test('fold: activity after the closing answer disables folding', () => {
  const { api, ChatNodeSeat } = buildSandbox()
  const fixture = completedFixture({ branchUnavailable: true })
  const result = classify(api.render({
    order: fixture.order,
    nodeStore: nodeStoreFrom(fixture.nodes),
    timeline: timelineFrom([fixture.turn]),
    sessionId: 'session-a',
    seat: {},
  }), api, ChatNodeSeat)
  deepEqual(result.every((item) => item.kind === 'seat'), true)
  deepEqual(result.map((item) => item.nodeKey), fixture.order)
})

test('fold: an unknown node after the closing answer also disables folding', () => {
  const { api, ChatNodeSeat } = buildSandbox()
  const fixture = completedFixture()
  const tailIndex = fixture.order.indexOf('tail')
  const unknown = { key: 'after-answer', kind: 'unknown', location: { kind: 'turn', turn: fixture.turn }, data: {} }
  fixture.nodes.splice(tailIndex, 0, unknown)
  fixture.order.splice(tailIndex, 0, unknown.key)
  const result = classify(api.render({
    order: fixture.order,
    nodeStore: nodeStoreFrom(fixture.nodes),
    timeline: timelineFrom([fixture.turn]),
    sessionId: 'session-a',
    seat: {},
  }), api, ChatNodeSeat)
  deepEqual(result.every((item) => item.kind === 'seat'), true)
  deepEqual(result.map((item) => item.nodeKey), fixture.order)
})

test('fold: incomplete timeline suppresses metrics instead of showing partial counts', () => {
  const { api, ChatNodeSeat } = buildSandbox()
  const fixture = completedFixture()
  const incomplete = { ...fixture.turn, start: undefined }
  for (const node of fixture.nodes) {
    if (node.location.kind === 'step' || node.location.kind === 'turn') node.location = { ...node.location, turn: incomplete }
  }
  const result = classify(api.render({
    order: fixture.order,
    nodeStore: nodeStoreFrom(fixture.nodes),
    timeline: timelineFrom([incomplete]),
    sessionId: 'session-a',
    seat: {},
  }), api, ChatNodeSeat)
  const disclosure = result.find((item) => item.kind === 'disclosure')
  deepEqual(disclosure.props.durationMs, null)
  deepEqual(disclosure.props.toolCount, null)
  deepEqual(disclosure.props.tokenCount, null)
})

test('fold: missing usage suppresses the token total', () => {
  const { api, ChatNodeSeat } = buildSandbox()
  const fixture = completedFixture()
  fixture.nodes.find((node) => node.key === 'think').data.usage = undefined
  const result = classify(api.render({
    order: fixture.order,
    nodeStore: nodeStoreFrom(fixture.nodes),
    timeline: timelineFrom([fixture.turn]),
    sessionId: 'session-a',
    seat: {},
  }), api, ChatNodeSeat)
  deepEqual(result.find((item) => item.kind === 'disclosure').props.tokenCount, null)
})

for (const [name, status, reason] of [
  ['failed', 'closed', 'error'],
  ['interrupted', 'closed', 'interrupted'],
  ['open', 'open', undefined],
]) {
  test(`fold: ${name} turn remains fully visible`, () => {
    const { api, ChatNodeSeat } = buildSandbox()
    const fixture = completedFixture()
    const changed = turnLocation(1, status, 1000, status === 'closed' ? 85000 : undefined, reason)
    for (const node of fixture.nodes) {
      if (node.location.kind === 'step' || node.location.kind === 'turn') node.location = { ...node.location, turn: changed }
    }
    const result = classify(api.render({
      order: fixture.order,
      nodeStore: nodeStoreFrom(fixture.nodes),
      timeline: timelineFrom([changed]),
      sessionId: 'session-a',
      seat: {},
    }), api, ChatNodeSeat)
    deepEqual(result.every((item) => item.kind === 'seat'), true)
  })
}

test('disclosure: accessible control and open state survive remounts', () => {
  const { api } = buildSandbox()
  const props = {
    activity: ['think'],
    durationMs: 84000,
    toolCount: 1,
    tokenCount: 1400,
    foldKey: 'session-persist:7',
    seat: { t: () => '1m 24s' },
  }
  const closed = api.disclosure(props)
  const closedButton = closed.props.children[0]
  deepEqual(closedButton.props['aria-expanded'], false)
  assert.match(closedButton.props['aria-label'], /^Expand agent activity:/)
  assert.ok(closedButton.props['aria-controls'])
  deepEqual(closed.props.children[1].props['aria-hidden'], true)
  deepEqual(closed.props.children[1].props.children, null)
  closedButton.props.onClick()

  const reopened = api.disclosure(props)
  const reopenedButton = reopened.props.children[0]
  deepEqual(reopenedButton.props['aria-expanded'], true)
  assert.match(reopenedButton.props['aria-label'], /^Collapse agent activity:/)
  deepEqual(reopened.props['data-turn-fold-open'], 'true')
  deepEqual(reopened.props.children[1].props.inert, false)
})

test('helpers: output token reader rejects incomplete and invalid usage', () => {
  const { api } = buildSandbox()
  deepEqual(api.outputTokens({ outputTokens: 0 }), 0)
  deepEqual(api.outputTokens({ outputTokens: 500 }), 500)
  deepEqual(api.outputTokens({ outputTokens: -1 }), null)
  deepEqual(api.outputTokens({ outputTokens: '500' }), null)
  deepEqual(api.outputTokens(null), null)
})

process.stdout.write(`\n${passed} passed, ${failed} failed\n`)
process.exit(failed === 0 ? 0 : 1)
