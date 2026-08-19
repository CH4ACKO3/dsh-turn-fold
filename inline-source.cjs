// Runtime injected into @deepseek-ai/dsh-client-ui-conversation/lib/client.js.
//
// Keep this snippet browser-safe and dependency-free. It executes inside the
// target module factory, where react, react_jsx_runtime, ChatNodeSeat,
// formatRunDuration, and formatTokens are already in scope.
//
// Selector constraints from patch.cjs:
//   - do not declare a function named ChatView;
//   - do not call .map(...) on a variable named order.
module.exports = String.raw`/* dsh-turn-fold runtime (injected) */
var __dshTurnFoldCss = ".__dsh-turn-fold{min-width:0;margin:1px 0 2px;animation:__dsh-turn-fold-enter .18s cubic-bezier(.33,1,.68,1)}.__dsh-turn-fold__bar{display:flex;align-items:center;gap:6px;width:100%;min-height:32px;margin:0;padding:4px;border:0;border-radius:6px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;text-align:left;font:var(--dsw-font-xs-13);transition:color .14s ease,background-color .14s ease}.__dsh-turn-fold__bar:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover-solid)}.__dsh-turn-fold__bar:focus-visible{outline:2px solid var(--dsw-static-deepseek-500);outline-offset:1px}.__dsh-turn-fold__label{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:var(--dsw-font-xs-13);font-variant-numeric:tabular-nums;color:inherit}.__dsh-turn-fold__rule{height:1px;min-width:16px;flex:1;background:var(--dsw-alias-border-l3)}.__dsh-turn-fold__chevron{flex:none;color:var(--dsw-alias-label-caption);transform:rotate(-90deg);transition:transform .16s cubic-bezier(.33,1,.68,1),color .14s ease}.__dsh-turn-fold--open .__dsh-turn-fold__chevron{transform:rotate(0deg)}.__dsh-turn-fold__bar:hover .__dsh-turn-fold__chevron{color:var(--dsw-alias-label-secondary)}.__dsh-turn-fold__clip{display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .18s cubic-bezier(.33,1,.68,1),opacity .14s ease}.__dsh-turn-fold--open .__dsh-turn-fold__clip{grid-template-rows:1fr;opacity:1}.__dsh-turn-fold__bodyWrap{min-height:0;overflow:hidden}.__dsh-turn-fold__body{display:flex;flex-direction:column;gap:16px;margin-top:12px}@keyframes __dsh-turn-fold-enter{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}@media(max-width:520px){.__dsh-turn-fold__bar{align-items:flex-start}.__dsh-turn-fold__label{white-space:normal;line-height:18px}.__dsh-turn-fold__rule{margin-top:9px;min-width:8px}.__dsh-turn-fold__chevron{margin-top:3px}}@media(prefers-reduced-motion:reduce){.__dsh-turn-fold{animation:none}.__dsh-turn-fold__bar,.__dsh-turn-fold__chevron,.__dsh-turn-fold__clip{transition:none}}";
if (typeof document !== "undefined" && document.querySelector('style[data-plugin="dsh-turn-fold"]') === null) {
  var __dshTurnFoldStyle = document.createElement("style");
  __dshTurnFoldStyle.setAttribute("data-plugin", "dsh-turn-fold");
  __dshTurnFoldStyle.textContent = __dshTurnFoldCss;
  document.head.appendChild(__dshTurnFoldStyle);
}
var __dshTurnFoldOpenKeys = new Set();
var __dshTurnFoldBodyId = 0;
function __dshTurnFoldLanguageIsZh() {
  var language = typeof document !== "undefined" ? document.documentElement.lang : "";
  if (!language && typeof navigator !== "undefined") language = navigator.language || "";
  return language.toLowerCase().indexOf("zh") === 0;
}
function __dshTurnFoldText(zh, en) {
  return __dshTurnFoldLanguageIsZh() ? zh : en;
}
function __dshTurnFoldOutputTokens(usage) {
  if (typeof usage !== "object" || usage === null) return null;
  var value = usage.outputTokens;
  return typeof value === "number" && isFinite(value) && value >= 0 ? value : null;
}
function __dshTurnFoldSeat(key, seat) {
  return react_jsx_runtime.jsx(ChatNodeSeat, {
    nodeKey: key,
    useSession: seat.useSession,
    selectedCallId: seat.selectedCallId,
    cwd: seat.cwd,
    openFile: seat.openFile,
    inspectCall: seat.inspectCall,
    forkAt: seat.forkAt,
    loadImage: seat.loadImage,
    fileMentions: seat.fileMentions,
    renderSlot: seat.renderSlot,
    t: seat.t
  }, key);
}
function __dshTurnFoldMotionMs() {
  if (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  return 180;
}
function __dshTurnFoldInteractionKey() {
  if (typeof document === "undefined") return null;
  var active = document.activeElement;
  var activeRow = active instanceof Element ? active.closest("[data-chat-anchor-key]") : null;
  if (activeRow !== null && activeRow.dataset.chatAnchorKey) return activeRow.dataset.chatAnchorKey;
  if (typeof window === "undefined" || typeof window.getSelection !== "function") return null;
  var selection = window.getSelection();
  if (selection === null || selection.isCollapsed || selection.anchorNode === null) return null;
  var anchor = selection.anchorNode.nodeType === 1 ? selection.anchorNode : selection.anchorNode.parentElement;
  var selectionRow = anchor instanceof Element ? anchor.closest("[data-chat-anchor-key]") : null;
  return selectionRow === null ? null : selectionRow.dataset.chatAnchorKey || null;
}
function __dshTurnFoldDisclosure(props) {
  var activity = props.activity;
  var foldKey = props.foldKey;
  var seat = props.seat;
  var initialOpen = __dshTurnFoldOpenKeys.has(foldKey);
  var expandedState = react.useState(initialOpen);
  var expanded = expandedState[0];
  var setExpanded = expandedState[1];
  var renderedState = react.useState(initialOpen);
  var bodyRendered = renderedState[0];
  var setBodyRendered = renderedState[1];
  var frameRef = react.useRef(null);
  var timerRef = react.useRef(null);
  var bodyIdState = react.useState(function () { return "__dsh-turn-fold-body-" + (++__dshTurnFoldBodyId); });
  var bodyId = bodyIdState[0];
  react.useEffect(function () {
    return function () {
      if (frameRef.current !== null && typeof cancelAnimationFrame === "function") cancelAnimationFrame(frameRef.current);
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);
  var durationText = typeof props.durationMs === "number" && isFinite(props.durationMs) && props.durationMs >= 0
    ? formatRunDuration(props.durationMs, seat.t)
    : null;
  var parts = [];
  if (durationText !== null) parts.push(__dshTurnFoldText("工作了 " + durationText, "Worked for " + durationText));
  else parts.push(__dshTurnFoldText("执行过程", "Agent activity"));
  if (typeof props.toolCount === "number" && props.toolCount > 0) {
    parts.push(__dshTurnFoldText(props.toolCount + " 次工具调用", props.toolCount + (props.toolCount === 1 ? " tool call" : " tool calls")));
  }
  if (typeof props.tokenCount === "number") {
    parts.push(__dshTurnFoldText(formatTokens(props.tokenCount) + " 输出 tokens", formatTokens(props.tokenCount) + " output tokens"));
  }
  var label = parts.join(" · ");
  var actionLabel = (expanded ? __dshTurnFoldText("收起执行过程：", "Collapse agent activity: ") : __dshTurnFoldText("展开执行过程：", "Expand agent activity: ")) + label;
  function toggle() {
    if (frameRef.current !== null && typeof cancelAnimationFrame === "function") cancelAnimationFrame(frameRef.current);
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    frameRef.current = null;
    timerRef.current = null;
    if (expanded) {
      __dshTurnFoldOpenKeys.delete(foldKey);
      setExpanded(false);
      var delay = __dshTurnFoldMotionMs();
      if (delay === 0) setBodyRendered(false);
      else timerRef.current = setTimeout(function () {
        timerRef.current = null;
        setBodyRendered(false);
      }, delay);
      return;
    }
    __dshTurnFoldOpenKeys.add(foldKey);
    setBodyRendered(true);
    if (__dshTurnFoldMotionMs() === 0 || typeof requestAnimationFrame !== "function") {
      setExpanded(true);
      return;
    }
    frameRef.current = requestAnimationFrame(function () {
      frameRef.current = null;
      setExpanded(true);
    });
  }
  return react_jsx_runtime.jsxs("div", {
    className: "__dsh-turn-fold" + (expanded ? " __dsh-turn-fold--open" : ""),
    "data-turn-fold": "",
    "data-turn-fold-open": expanded ? "true" : "false",
    children: [
      react_jsx_runtime.jsxs("button", {
        type: "button",
        className: "__dsh-turn-fold__bar",
        "aria-expanded": expanded,
        "aria-controls": bodyId,
        "aria-label": actionLabel,
        title: actionLabel,
        onClick: toggle,
        children: [
          react_jsx_runtime.jsx("span", { className: "__dsh-turn-fold__label", children: label }),
          react_jsx_runtime.jsx("span", { className: "__dsh-turn-fold__rule", "aria-hidden": true }),
          react_jsx_runtime.jsx("svg", {
            className: "__dsh-turn-fold__chevron",
            width: 12,
            height: 12,
            viewBox: "0 0 12 12",
            "aria-hidden": true,
            children: react_jsx_runtime.jsx("path", {
              d: "M3.5 4.5 6 7l2.5-2.5",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: 1.5,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          })
        ]
      }),
      react_jsx_runtime.jsx("div", {
        id: bodyId,
        className: "__dsh-turn-fold__clip",
        "aria-hidden": !expanded,
        inert: !expanded,
        children: bodyRendered ? react_jsx_runtime.jsx("div", {
          className: "__dsh-turn-fold__bodyWrap",
          children: react_jsx_runtime.jsx("div", {
            className: "__dsh-turn-fold__body",
            children: activity.map(function (key) { return __dshTurnFoldSeat(key, seat); })
          })
        }) : null
      })
    ]
  });
}
function __dshTurnFoldPlanMetrics(plan, nodeStore, timeline) {
  var turnLoc = timeline.turns.get(plan.turn);
  var startEv = turnLoc === void 0 ? void 0 : turnLoc.start;
  var endEv = turnLoc === void 0 ? void 0 : turnLoc.end;
  var complete = startEv !== void 0 && endEv !== void 0 && typeof startEv.time === "number" && typeof endEv.time === "number";
  var durationMs = complete && endEv.time >= startEv.time ? endEv.time - startEv.time : null;
  var toolCount = 0;
  var tokenTotal = 0;
  var tokenReliable = complete;
  var tokenSeen = 0;
  var i;
  for (i = 0; i < plan.activity.length; i++) {
    var node = nodeStore.get(plan.activity[i]);
    if (node === void 0) continue;
    if (node.kind === "tool-call") toolCount++;
    if (node.kind === "assistant-step") {
      tokenSeen++;
      var value = __dshTurnFoldOutputTokens(node.data === void 0 ? void 0 : node.data.usage);
      if (value === null) tokenReliable = false;
      else tokenTotal += value;
    }
  }
  var closingNode = nodeStore.get(plan.closingKey);
  if (closingNode !== void 0 && closingNode.kind === "assistant-step") {
    tokenSeen++;
    var closingTokens = __dshTurnFoldOutputTokens(closingNode.data === void 0 ? void 0 : closingNode.data.usage);
    if (closingTokens === null) tokenReliable = false;
    else tokenTotal += closingTokens;
  }
  return {
    durationMs: durationMs,
    toolCount: complete ? toolCount : null,
    tokenCount: tokenReliable && tokenSeen > 0 ? tokenTotal : null
  };
}
function __dshTurnFoldRender(props) {
  var order = props.order;
  var nodeStore = props.nodeStore;
  var timeline = props.timeline;
  var seat = props.seat;
  var sessionId = props.sessionId;
  var FOLD_KINDS = {
    "assistant-step": true,
    "tool-call": true,
    "command": true,
    "manual-compaction": true,
    "compaction": true,
    "model-retry": true
  };
  var plans = new Map();
  var i, key, node, loc, turnNum, plan;
  for (i = 0; i < order.length; i++) {
    key = order[i];
    node = nodeStore.get(key);
    if (node === void 0) continue;
    loc = node.location;
    if (loc === void 0 || (loc.kind !== "turn" && loc.kind !== "step")) continue;
    turnNum = loc.turn.turn;
    plan = plans.get(turnNum);
    if (plan === void 0) {
      plan = { turn: turnNum, status: loc.turn.status, endReason: void 0, closingSeq: void 0, closingKey: void 0, closingOrder: -1, tailKey: void 0, branchUnavailable: false, hasAfterClosing: false, hasError: false, activity: [] };
      plans.set(turnNum, plan);
    }
    var endEvent = loc.turn.end;
    if (endEvent !== void 0 && endEvent.data !== void 0 && endEvent.data.reason !== void 0) plan.endReason = endEvent.data.reason.kind;
    if (node.kind === "turn-tail") {
      plan.tailKey = key;
      var closing = node.data === void 0 ? void 0 : node.data.closing;
      if (closing !== null && closing !== void 0 && closing.finalNode !== void 0) plan.closingSeq = closing.finalNode.seq;
      plan.branchUnavailable = node.data !== void 0 && node.data.branchUnavailable === true;
    } else if (node.kind === "turn-error" || node.kind === "turn-max-tokens") {
      plan.hasError = true;
    }
  }
  for (i = 0; i < order.length; i++) {
    key = order[i];
    node = nodeStore.get(key);
    if (node === void 0) continue;
    loc = node.location;
    if (loc === void 0 || (loc.kind !== "turn" && loc.kind !== "step")) continue;
    plan = plans.get(loc.turn.turn);
    if (plan === void 0) continue;
    if (plan.closingSeq !== void 0 && node.kind === "assistant-step" && node.data !== void 0 && node.data.finalNode !== void 0 && node.data.finalNode.seq === plan.closingSeq) {
      plan.closingKey = key;
      plan.closingOrder = i;
    }
  }
  for (i = 0; i < order.length; i++) {
    key = order[i];
    node = nodeStore.get(key);
    if (node === void 0) continue;
    loc = node.location;
    if (loc === void 0 || (loc.kind !== "turn" && loc.kind !== "step")) continue;
    plan = plans.get(loc.turn.turn);
    if (plan === void 0 || key === plan.closingKey || key === plan.tailKey) continue;
    if (plan.closingOrder >= 0 && i > plan.closingOrder) plan.hasAfterClosing = true;
    if (FOLD_KINDS[node.kind] === true) plan.activity.push(key);
  }
  var out = [];
  var interactionKey = __dshTurnFoldInteractionKey();
  for (i = 0; i < order.length; i++) {
    key = order[i];
    node = nodeStore.get(key);
    if (node === void 0) continue;
    loc = node.location;
    var isTurn = loc !== void 0 && (loc.kind === "turn" || loc.kind === "step");
    plan = isTurn ? plans.get(loc.turn.turn) : void 0;
    var foldable = plan !== void 0 && plan.status === "closed" && plan.endReason === "completed" && !plan.hasError && !plan.branchUnavailable && !plan.hasAfterClosing && plan.closingKey !== void 0 && plan.activity.length > 0 && plan.activity.indexOf(interactionKey) === -1;
    if (foldable && FOLD_KINDS[node.kind] === true && key !== plan.closingKey) continue;
    if (foldable && key === plan.closingKey) {
      var metrics = __dshTurnFoldPlanMetrics(plan, nodeStore, timeline);
      out.push(react_jsx_runtime.jsx(__dshTurnFoldDisclosure, {
        activity: plan.activity,
        durationMs: metrics.durationMs,
        toolCount: metrics.toolCount,
        tokenCount: metrics.tokenCount,
        foldKey: String(sessionId) + ":" + plan.turn,
        seat: seat
      }, "dsh-turn-fold-" + String(sessionId) + "-" + plan.turn));
    }
    out.push(__dshTurnFoldSeat(key, seat));
  }
  return out;
}
`;
