'use strict'

// Runtime injected into @deepseek-ai/dsh-client-ui-conversation/lib/client.js.
// It executes inside the target module factory, where react,
// react_jsx_runtime, formatRunDuration, and formatTokens are already in scope.
const dictionaries = require('./locales.cjs')
const { DEFAULT_SUMMARY_FIELDS, SETTINGS_NAMESPACE, SUMMARY_FIELDS } = require('./settings.cjs')

module.exports = String.raw`/* @ch4acko3/dsh-turn-fold runtime (injected) */
var __ch4acko3DshTurnFoldLocaleNamespace = "@ch4acko3/dsh-turn-fold";
var __ch4acko3DshTurnFoldDictionaries = ${JSON.stringify(dictionaries)};
var __ch4acko3DshTurnFoldSettingsNamespace = ${JSON.stringify(SETTINGS_NAMESPACE)};
var __ch4acko3DshTurnFoldKnownFields = ${JSON.stringify(SUMMARY_FIELDS)};
var __ch4acko3DshTurnFoldDefaultFields = ${JSON.stringify(DEFAULT_SUMMARY_FIELDS)};
var __ch4acko3DshTurnFoldTranslate = null;
var __ch4acko3DshTurnFoldSettingsScope = null;
var __ch4acko3DshTurnFoldSummaryFields = __ch4acko3DshTurnFoldDefaultFields.slice();
var __ch4acko3DshTurnFoldSettingsListeners = new Set();
var __ch4acko3DshTurnFoldCss = [
  ".__ch4acko3-dsh-turn-fold{min-width:0;margin:1px 0 2px;animation:__ch4acko3-dsh-turn-fold-enter .18s cubic-bezier(.33,1,.68,1)}",
  ".__ch4acko3-dsh-turn-fold__header{display:block;width:100%;min-height:28px;box-sizing:border-box;margin:0;padding:3px 4px;color:var(--dsw-alias-label-secondary);text-align:left;font:var(--dsw-font-xs-13)}",
  "button.__ch4acko3-dsh-turn-fold__header{appearance:none;-webkit-tap-highlight-color:transparent;border:0;border-radius:0;background:transparent;cursor:pointer}",
  "button.__ch4acko3-dsh-turn-fold__header:focus-visible{outline:2px solid var(--dsw-static-deepseek-500);outline-offset:1px}",
  ".__ch4acko3-dsh-turn-fold__label{display:inline;max-width:100%;font:var(--dsw-font-xs-13);font-variant-numeric:tabular-nums;color:inherit}",
  ".__ch4acko3-dsh-turn-fold__metric{white-space:nowrap}",
  ".__ch4acko3-dsh-turn-fold__separator{display:inline-block;width:1px;height:10px;margin:0 7px;background:var(--dsw-alias-border-l2);vertical-align:-1px}",
  ".__ch4acko3-dsh-turn-fold__metricWindow{display:inline-block;overflow:hidden;vertical-align:bottom}",
  ".__ch4acko3-dsh-turn-fold__metricValue{display:inline-block;animation:__ch4acko3-dsh-turn-fold-metric-roll .2s cubic-bezier(.33,1,.68,1)}",
  ".__ch4acko3-dsh-turn-fold__rule{width:100%;height:1px;background:var(--dsw-alias-border-l3)}",
  ".__ch4acko3-dsh-turn-fold__chevron{display:inline-block;margin-left:5px;color:var(--dsw-alias-label-caption);vertical-align:-2px;transform:rotate(-90deg);transition:transform .16s cubic-bezier(.33,1,.68,1)}",
  ".__ch4acko3-dsh-turn-fold--open .__ch4acko3-dsh-turn-fold__chevron{transform:rotate(0deg)}",
  ".__ch4acko3-dsh-turn-fold__clip{display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .18s cubic-bezier(.33,1,.68,1),opacity .14s ease}",
  ".__ch4acko3-dsh-turn-fold--open .__ch4acko3-dsh-turn-fold__clip{grid-template-rows:1fr;opacity:1}",
  ".__ch4acko3-dsh-turn-fold__bodyWrap{min-height:0;overflow:hidden}",
  ".__ch4acko3-dsh-turn-fold__body{display:flex;flex-direction:column;gap:16px;margin-top:12px}",
  ".__ch4acko3-dsh-turn-fold__closing{display:contents}",
  ".__ch4acko3-dsh-turn-fold__closing [data-variant=think]{display:none}",
  ".__ch4acko3-dsh-turn-fold-settings{list-style:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px}",
  ".__ch4acko3-dsh-turn-fold-settings__header{appearance:none;width:100%;display:flex;align-items:center;gap:12px;padding:14px 16px;border:0;border-radius:12px;background:transparent;color:inherit;text-align:left;font:inherit;cursor:pointer}",
  ".__ch4acko3-dsh-turn-fold-settings__header:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}",
  ".__ch4acko3-dsh-turn-fold-settings__headText{display:flex;flex:1;min-width:0;flex-direction:column;gap:4px}",
  ".__ch4acko3-dsh-turn-fold-settings__title{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}",
  ".__ch4acko3-dsh-turn-fold-settings__description{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}",
  ".__ch4acko3-dsh-turn-fold-settings__chevron{flex:none;transform:rotate(-90deg);transition:transform .16s}",
  ".__ch4acko3-dsh-turn-fold-settings--open .__ch4acko3-dsh-turn-fold-settings__chevron{transform:rotate(0deg)}",
  ".__ch4acko3-dsh-turn-fold-settings__body{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 16px;margin:0 16px;padding:12px 0 14px;border-top:1px solid var(--dsw-alias-border-l2)}",
  ".__ch4acko3-dsh-turn-fold-settings__field{display:flex;align-items:center;gap:8px;min-width:0;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}",
  ".__ch4acko3-dsh-turn-fold-settings__field input{accent-color:var(--dsw-alias-brand-primary)}",
  ".__ch4acko3-dsh-turn-fold-settings__readOnly{grid-column:1/-1;margin:0;color:var(--dsw-alias-label-tertiary);font-size:12px}",
  "@keyframes __ch4acko3-dsh-turn-fold-enter{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}",
  "@keyframes __ch4acko3-dsh-turn-fold-metric-roll{from{opacity:.15;transform:translateY(65%)}to{opacity:1;transform:translateY(0)}}",
  "@media(max-width:520px){.__ch4acko3-dsh-turn-fold__label{line-height:18px}.__ch4acko3-dsh-turn-fold-settings__body{grid-template-columns:1fr}}",
  "@media(prefers-reduced-motion:reduce){.__ch4acko3-dsh-turn-fold,.__ch4acko3-dsh-turn-fold__metricValue{animation:none}.__ch4acko3-dsh-turn-fold__chevron,.__ch4acko3-dsh-turn-fold__clip,.__ch4acko3-dsh-turn-fold-settings__chevron{transition:none}}"
].join("");
if (typeof document !== "undefined") {
  var __ch4acko3DshTurnFoldStyle = document.getElementById("ch4acko3-dsh-turn-fold-style");
  if (__ch4acko3DshTurnFoldStyle === null) {
    __ch4acko3DshTurnFoldStyle = document.createElement("style");
    __ch4acko3DshTurnFoldStyle.id = "ch4acko3-dsh-turn-fold-style";
    __ch4acko3DshTurnFoldStyle.setAttribute("data-plugin", "@ch4acko3/dsh-turn-fold");
    document.head.appendChild(__ch4acko3DshTurnFoldStyle);
  }
  __ch4acko3DshTurnFoldStyle.textContent = __ch4acko3DshTurnFoldCss;
}
var __ch4acko3DshTurnFoldOpenKeys = new Set();
var __ch4acko3DshTurnFoldBodyId = 0;
function __ch4acko3DshTurnFoldText(key, params) {
  if (__ch4acko3DshTurnFoldTranslate === null) throw new Error("@ch4acko3/dsh-turn-fold: locale service was not installed");
  return __ch4acko3DshTurnFoldTranslate(key, params);
}
function __ch4acko3DshTurnFoldDecodeSettings(section) {
  if (typeof section !== "object" || section === null || !Array.isArray(section.summaryFields)) return void 0;
  var seen = new Set();
  var fields = [];
  for (var i = 0; i < section.summaryFields.length; i++) {
    var field = section.summaryFields[i];
    if (typeof field !== "string" || __ch4acko3DshTurnFoldKnownFields.indexOf(field) < 0) return void 0;
    if (!seen.has(field)) {
      seen.add(field);
      fields.push(field);
    }
  }
  return { summaryFields: fields };
}
function __ch4acko3DshTurnFoldPublishSettings(fields) {
  if (__ch4acko3DshTurnFoldSummaryFields.length === fields.length && __ch4acko3DshTurnFoldSummaryFields.every(function (field, index) { return field === fields[index]; })) return;
  __ch4acko3DshTurnFoldSummaryFields = fields.slice();
  __ch4acko3DshTurnFoldSettingsListeners.forEach(function (listener) { listener(); });
}
function __ch4acko3DshTurnFoldInstall(ctx) {
  ctx.effect(function () { return ctx.locale.register(__ch4acko3DshTurnFoldLocaleNamespace, __ch4acko3DshTurnFoldDictionaries); }, "@ch4acko3/dsh-turn-fold: dictionaries");
  __ch4acko3DshTurnFoldTranslate = ctx.locale.bind(__ch4acko3DshTurnFoldLocaleNamespace);
  var scope = ctx.settingsScope.bind({ namespace: __ch4acko3DshTurnFoldSettingsNamespace, decode: __ch4acko3DshTurnFoldDecodeSettings });
  __ch4acko3DshTurnFoldSettingsScope = scope;
  function publish() {
    var snapshot = scope.getSnapshot();
    if (snapshot.status === "ready" && snapshot.value !== void 0) __ch4acko3DshTurnFoldPublishSettings(snapshot.value.summaryFields);
  }
  ctx.effect(function () { return scope.subscribe(publish); }, "@ch4acko3/dsh-turn-fold: settings");
  publish();
  ctx.slots.inject("settings.plugin.item", function () {
    return ctx.slots.register({
      name: "settings.plugin.item",
      key: __ch4acko3DshTurnFoldSettingsNamespace
    }, __ch4acko3DshTurnFoldSettingsCard);
  });
}
function __ch4acko3DshTurnFoldSubscribeSettings(listener) {
  __ch4acko3DshTurnFoldSettingsListeners.add(listener);
  return function () { __ch4acko3DshTurnFoldSettingsListeners.delete(listener); };
}
function __ch4acko3DshTurnFoldGetSettingsSnapshot() {
  return __ch4acko3DshTurnFoldSummaryFields;
}
function __ch4acko3DshTurnFoldNumber(value) {
  return typeof value === "number" && isFinite(value) && value >= 0 ? value : null;
}
function __ch4acko3DshTurnFoldUsage(usage) {
  if (typeof usage !== "object" || usage === null) return null;
  var uncached = __ch4acko3DshTurnFoldNumber(usage.inputTokens);
  var output = __ch4acko3DshTurnFoldNumber(usage.outputTokens);
  if (uncached === null || output === null) return null;
  var cacheRead = usage.cacheReadTokens === void 0 ? 0 : __ch4acko3DshTurnFoldNumber(usage.cacheReadTokens);
  var cacheWrite = usage.cacheWriteTokens === void 0 ? 0 : __ch4acko3DshTurnFoldNumber(usage.cacheWriteTokens);
  var reasoning = usage.reasoningTokens === void 0 ? 0 : __ch4acko3DshTurnFoldNumber(usage.reasoningTokens);
  if (cacheRead === null || cacheWrite === null || reasoning === null) return null;
  return {
    inputTokens: uncached + cacheRead + cacheWrite,
    outputTokens: output,
    cacheReadTokens: cacheRead,
    cacheWriteTokens: cacheWrite,
    reasoningTokens: reasoning
  };
}
function __ch4acko3DshTurnFoldClosingReasoning(node) {
  var blocks = node !== void 0 && node.data !== void 0 ? node.data.blocks : void 0;
  if (!Array.isArray(blocks)) return [];
  return blocks.filter(function (block) {
    return block !== void 0 && block.kind === "reasoning" && typeof block.text === "string" && block.text.length > 0;
  }).map(function (block) { return block.text; });
}
function __ch4acko3DshTurnFoldMotionMs() {
  if (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  return 180;
}
function __ch4acko3DshTurnFoldInteractionKeys() {
  var keys = new Set();
  if (typeof document === "undefined") return keys;
  var active = document.activeElement;
  var activeRow = active instanceof Element ? active.closest("[data-chat-anchor-key]") : null;
  if (activeRow !== null && activeRow.dataset.chatAnchorKey) keys.add(activeRow.dataset.chatAnchorKey);
  if (typeof window === "undefined" || typeof window.getSelection !== "function") return keys;
  var selection = window.getSelection();
  if (selection === null || selection.isCollapsed || selection.rangeCount === 0) return keys;
  var range = selection.getRangeAt(0);
  var rows = document.querySelectorAll("[data-chat-anchor-key]");
  for (var i = 0; i < rows.length; i++) {
    if (range.intersectsNode(rows[i]) && rows[i].dataset.chatAnchorKey) keys.add(rows[i].dataset.chatAnchorKey);
  }
  return keys;
}
function __ch4acko3DshTurnFoldChevron() {
  return react_jsx_runtime.jsx("svg", {
    className: "__ch4acko3-dsh-turn-fold__chevron",
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
  });
}
function __ch4acko3DshTurnFoldSettingsCard() {
  var openState = react.useState(false);
  var open = openState[0];
  var setOpen = openState[1];
  var pendingState = react.useState(false);
  var pending = pendingState[0];
  var setPending = pendingState[1];
  var failedState = react.useState(false);
  var failed = failedState[0];
  var setFailed = failedState[1];
  var scope = __ch4acko3DshTurnFoldSettingsScope;
  if (scope === null) return null;
  var snapshot = react.useSyncExternalStore(function (listener) { return scope.subscribe(listener); }, function () { return scope.getSnapshot(); }, function () { return scope.getSnapshot(); });
  if (snapshot.status !== "ready" || snapshot.value === void 0) return null;
  var fields = snapshot.value.summaryFields;
  var title = __ch4acko3DshTurnFoldText("settings.title");
  function toggleField(field, checked) {
    if (!snapshot.writable || pending) return;
    var next = __ch4acko3DshTurnFoldKnownFields.filter(function (candidate) {
      return candidate === field ? checked : fields.indexOf(candidate) >= 0;
    });
    setPending(true);
    setFailed(false);
    scope.set("summaryFields", next).then(function () {
      setPending(false);
    }, function () {
      setPending(false);
      setFailed(true);
    });
  }
  return react_jsx_runtime.jsxs("li", {
    className: "__ch4acko3-dsh-turn-fold-settings" + (open ? " __ch4acko3-dsh-turn-fold-settings--open" : ""),
    "data-ch4acko3-dsh-turn-fold-settings": "",
    children: [
      react_jsx_runtime.jsxs("button", {
        type: "button",
        className: "__ch4acko3-dsh-turn-fold-settings__header",
        "aria-expanded": open,
        "aria-label": __ch4acko3DshTurnFoldText(open ? "settings.collapse" : "settings.expand", { title: title }),
        onClick: function () { setOpen(!open); },
        children: [
          react_jsx_runtime.jsxs("span", {
            className: "__ch4acko3-dsh-turn-fold-settings__headText",
            children: [
              react_jsx_runtime.jsx("span", { className: "__ch4acko3-dsh-turn-fold-settings__title", children: title }),
              react_jsx_runtime.jsx("span", { className: "__ch4acko3-dsh-turn-fold-settings__description", children: __ch4acko3DshTurnFoldText("settings.description") })
            ]
          }),
          react_jsx_runtime.jsx(__ch4acko3DshTurnFoldChevron, {})
        ]
      }),
      open ? react_jsx_runtime.jsxs("div", {
        className: "__ch4acko3-dsh-turn-fold-settings__body",
        children: [
          !snapshot.writable ? react_jsx_runtime.jsx("p", { className: "__ch4acko3-dsh-turn-fold-settings__readOnly", role: "status", children: __ch4acko3DshTurnFoldText("settings.readOnly") }) : null,
          failed ? react_jsx_runtime.jsx("p", { className: "__ch4acko3-dsh-turn-fold-settings__readOnly", role: "alert", children: __ch4acko3DshTurnFoldText("settings.writeFailed") }) : null,
          __ch4acko3DshTurnFoldKnownFields.map(function (field) {
            return react_jsx_runtime.jsxs("label", {
              className: "__ch4acko3-dsh-turn-fold-settings__field",
              children: [
                react_jsx_runtime.jsx("input", {
                  type: "checkbox",
                  checked: fields.indexOf(field) >= 0,
                  disabled: !snapshot.writable || pending,
                  onChange: function (event) { toggleField(field, event.currentTarget.checked); }
                }),
                react_jsx_runtime.jsx("span", { children: __ch4acko3DshTurnFoldText("settings." + field) })
              ]
            }, field);
          })
        ]
      }) : null
    ]
  });
}
function __ch4acko3DshTurnFoldLiveDuration(metrics, running) {
  var nowState = react.useState(function () { return Date.now(); });
  var now = nowState[0];
  var setNow = nowState[1];
  react.useEffect(function () {
    if (!running || typeof metrics.startTime !== "number") return;
    var timer = setInterval(function () { setNow(Date.now()); }, 1000);
    return function () { clearInterval(timer); };
  }, [running, metrics.startTime]);
  if (running && typeof metrics.startTime === "number") return Math.max(0, now - metrics.startTime);
  return metrics.durationMs;
}
function __ch4acko3DshTurnFoldSpacedDuration(value) {
  return value.replace(/(\d)(?=(?:小时|分钟|秒|分|时))/g, "$1 ").replace(/(小时|分钟|秒|分|时)(?=\d)/g, "$1 ");
}
function __ch4acko3DshTurnFoldCountPart(field, key, count, display, qualifier) {
  var marker = "__ch4acko3_dsh_turn_fold_value__";
  var template = __ch4acko3DshTurnFoldText(key, { count: marker });
  var position = template.indexOf(marker);
  if (position < 0) throw new Error("@ch4acko3/dsh-turn-fold: summary locale omitted {count} for " + key);
  qualifier = qualifier || "";
  return {
    field: field,
    text: template.slice(0, position) + qualifier + display + template.slice(position + marker.length),
    prefix: template.slice(0, position) + qualifier,
    value: display,
    suffix: template.slice(position + marker.length),
    rolling: true,
    animationKey: String(count)
  };
}
function __ch4acko3DshTurnFoldSummaryParts(metrics, running, completed, durationT) {
  var fields = react.useSyncExternalStore(__ch4acko3DshTurnFoldSubscribeSettings, __ch4acko3DshTurnFoldGetSettingsSnapshot, __ch4acko3DshTurnFoldGetSettingsSnapshot);
  var durationMs = __ch4acko3DshTurnFoldLiveDuration(metrics, running);
  var parts = [];
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    var value = metrics[field];
    if (field === "duration") {
      if (typeof durationMs === "number" && isFinite(durationMs) && durationMs >= 0) parts.push({
        field: field,
        text: __ch4acko3DshTurnFoldText(completed ? "summary.elapsed" : "summary.duration", { duration: __ch4acko3DshTurnFoldSpacedDuration(formatRunDuration(durationMs, durationT)) })
      });
    } else if (field === "toolCalls" || field === "modelCalls") {
      if (typeof value === "number") parts.push(__ch4acko3DshTurnFoldCountPart(field, "summary." + field + (value === 1 ? ".one" : ".many"), value, String(value)));
    } else if (field === "timeToFirstToken") {
      if (typeof value === "number") parts.push({ field: field, text: __ch4acko3DshTurnFoldText("summary.timeToFirstToken", { seconds: value < 10000 ? Math.round(value / 100) / 10 : Math.round(value / 1000) }) });
    } else if (field === "tokensPerSecond") {
      if (typeof value === "number") parts.push({ field: field, text: __ch4acko3DshTurnFoldText("summary.tokensPerSecond", { count: value >= 10 ? Math.round(value) : Math.round(value * 10) / 10 }) });
    } else if (typeof value === "number") {
      parts.push(__ch4acko3DshTurnFoldCountPart(field, "summary." + field, value, formatTokens(value), metrics.tokenUsagePartial ? "≥ " : ""));
    }
  }
  return parts.length === 0 ? [{ field: "activity", text: __ch4acko3DshTurnFoldText("summary.activity") }] : parts;
}
function __ch4acko3DshTurnFoldSummaryLabel(parts) {
  return parts.map(function (part) { return part.text; }).join(" | ");
}
function __ch4acko3DshTurnFoldStatusSuffix(termination) {
  if (termination === "aborted") return __ch4acko3DshTurnFoldText("summary.stoppedSuffix");
  if (termination === "interrupted") return __ch4acko3DshTurnFoldText("summary.interruptedSuffix");
  return "";
}
function __ch4acko3DshTurnFoldSummaryChildren(parts, disclosure, statusSuffix) {
  var children = [];
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];
    if (i > 0) children.push(react_jsx_runtime.jsx("span", { className: "__ch4acko3-dsh-turn-fold__separator", "aria-hidden": true }, "separator-" + i));
    var content = part.rolling ? [
      part.prefix,
      react_jsx_runtime.jsx("span", {
        className: "__ch4acko3-dsh-turn-fold__metricWindow",
        children: react_jsx_runtime.jsx("span", { className: "__ch4acko3-dsh-turn-fold__metricValue", children: part.value }, part.field + "-" + part.animationKey)
      }, "value"),
      part.suffix
    ] : part.text;
    children.push((part.rolling ? react_jsx_runtime.jsxs : react_jsx_runtime.jsx)("span", { className: "__ch4acko3-dsh-turn-fold__metric", children: content }, part.field));
  }
  if (statusSuffix) children.push(react_jsx_runtime.jsx("span", { className: "__ch4acko3-dsh-turn-fold__metric", children: statusSuffix }, "status"));
  if (disclosure) children.push(react_jsx_runtime.jsx(__ch4acko3DshTurnFoldChevron, {}, "chevron"));
  return children;
}
function __ch4acko3DshTurnFoldSummary(props) {
  var parts = __ch4acko3DshTurnFoldSummaryParts(props.metrics, props.running, props.completed, props.t);
  var statusSuffix = __ch4acko3DshTurnFoldStatusSuffix(props.termination);
  var label = __ch4acko3DshTurnFoldSummaryLabel(parts) + statusSuffix;
  return react_jsx_runtime.jsxs("div", {
    className: "__ch4acko3-dsh-turn-fold",
    "data-ch4acko3-dsh-turn-fold-summary": props.running ? "running" : "complete",
    "data-dsh-summary-owner": "@ch4acko3/dsh-turn-fold",
    children: [
      react_jsx_runtime.jsx("div", {
        className: "__ch4acko3-dsh-turn-fold__header",
        role: props.running ? "status" : void 0,
        "aria-label": props.running ? label : void 0,
        children: react_jsx_runtime.jsxs("span", { className: "__ch4acko3-dsh-turn-fold__label", "aria-hidden": props.running ? true : void 0, children: __ch4acko3DshTurnFoldSummaryChildren(parts, false, statusSuffix) })
      }),
      react_jsx_runtime.jsx("div", { className: "__ch4acko3-dsh-turn-fold__rule", "aria-hidden": true })
    ]
  });
}
function __ch4acko3DshTurnFoldDisclosure(props) {
  var activity = props.activity;
  var foldKey = props.foldKey;
  var renderNode = props.renderNode;
  var initialOpen = __ch4acko3DshTurnFoldOpenKeys.has(foldKey);
  var expandedState = react.useState(initialOpen);
  var expanded = expandedState[0];
  var setExpanded = expandedState[1];
  var renderedState = react.useState(initialOpen);
  var bodyRendered = renderedState[0];
  var setBodyRendered = renderedState[1];
  var frameRef = react.useRef(null);
  var timerRef = react.useRef(null);
  var bodyIdState = react.useState(function () { return "ch4acko3-dsh-turn-fold-body-" + (++__ch4acko3DshTurnFoldBodyId); });
  var bodyId = bodyIdState[0];
  react.useEffect(function () {
    return function () {
      if (frameRef.current !== null && typeof cancelAnimationFrame === "function") cancelAnimationFrame(frameRef.current);
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);
  var parts = __ch4acko3DshTurnFoldSummaryParts(props.metrics, false, props.completed, props.t);
  var statusSuffix = __ch4acko3DshTurnFoldStatusSuffix(props.termination);
  var label = __ch4acko3DshTurnFoldSummaryLabel(parts) + statusSuffix;
  var actionLabel = __ch4acko3DshTurnFoldText(expanded ? "action.collapse" : "action.expand", { summary: label });
  function toggle() {
    if (frameRef.current !== null && typeof cancelAnimationFrame === "function") cancelAnimationFrame(frameRef.current);
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    frameRef.current = null;
    timerRef.current = null;
    if (expanded) {
      __ch4acko3DshTurnFoldOpenKeys.delete(foldKey);
      setExpanded(false);
      var delay = __ch4acko3DshTurnFoldMotionMs();
      if (delay === 0) setBodyRendered(false);
      else timerRef.current = setTimeout(function () {
        timerRef.current = null;
        setBodyRendered(false);
      }, delay);
      return;
    }
    __ch4acko3DshTurnFoldOpenKeys.add(foldKey);
    setBodyRendered(true);
    if (__ch4acko3DshTurnFoldMotionMs() === 0 || typeof requestAnimationFrame !== "function") {
      setExpanded(true);
      return;
    }
    frameRef.current = requestAnimationFrame(function () {
      frameRef.current = null;
      setExpanded(true);
    });
  }
  return react_jsx_runtime.jsxs("div", {
    className: "__ch4acko3-dsh-turn-fold" + (expanded ? " __ch4acko3-dsh-turn-fold--open" : ""),
    "data-ch4acko3-dsh-turn-fold": "",
    "data-ch4acko3-dsh-turn-fold-open": expanded ? "true" : "false",
    "data-dsh-fold-owner": "@ch4acko3/dsh-turn-fold",
    "data-dsh-fold-scope": "turn",
    children: [
      react_jsx_runtime.jsx("button", {
        type: "button",
        className: "__ch4acko3-dsh-turn-fold__header",
        "aria-expanded": expanded,
        "aria-controls": bodyId,
        "aria-label": actionLabel,
        title: actionLabel,
        onClick: toggle,
        children: react_jsx_runtime.jsxs("span", { className: "__ch4acko3-dsh-turn-fold__label", "aria-hidden": true, children: __ch4acko3DshTurnFoldSummaryChildren(parts, true, statusSuffix) })
      }),
      react_jsx_runtime.jsx("div", { className: "__ch4acko3-dsh-turn-fold__rule", "aria-hidden": true }),
      react_jsx_runtime.jsx("div", {
        id: bodyId,
        className: "__ch4acko3-dsh-turn-fold__clip",
        "aria-hidden": !expanded,
        inert: !expanded,
        children: bodyRendered ? react_jsx_runtime.jsx("div", {
          className: "__ch4acko3-dsh-turn-fold__bodyWrap",
          children: react_jsx_runtime.jsxs("div", {
            className: "__ch4acko3-dsh-turn-fold__body",
            children: [
              activity.map(function (key) { return renderNode(key); }),
              (props.closingReasoning || []).map(function (text, index) {
                return react_jsx_runtime.jsx(ReasoningRow, { text: text, running: false, t: props.t }, "closing-reasoning-" + index);
              })
            ]
          })
        }) : null
      })
    ]
  });
}
function __ch4acko3DshTurnFoldPlanMetrics(plan, nodeStore, timeline) {
  var turnLoc = timeline.turns.get(plan.turn);
  var startEv = turnLoc === void 0 ? void 0 : turnLoc.start;
  var endEv = turnLoc === void 0 ? void 0 : turnLoc.end;
  var startTime = startEv !== void 0 && typeof startEv.time === "number" ? startEv.time : null;
  var complete = startTime !== null && endEv !== void 0 && typeof endEv.time === "number";
  var durationMs = complete && endEv.time >= startTime ? endEv.time - startTime : null;
  var metrics = {
    startTime: startTime,
    durationMs: durationMs,
    toolCalls: 0,
    modelCalls: 0,
    inputTokens: 0,
    outputTokens: 0,
    cacheReadTokens: 0,
    cacheWriteTokens: 0,
    reasoningTokens: 0,
    tokenUsagePartial: false,
    timeToFirstToken: null,
    tokensPerSecond: null
  };
  var usageReliable = true;
  var usageSamples = 0;
  var decodeMs = 0;
  var decodeTokens = 0;
  var sampledDecode = false;
  var firstStep = null;
  var keys = plan.activity.slice();
  if (plan.closingKey !== void 0 && keys.indexOf(plan.closingKey) < 0) keys.push(plan.closingKey);
  for (var i = 0; i < keys.length; i++) {
    var node = nodeStore.get(keys[i]);
    if (node === void 0) continue;
    if (node.kind === "tool-call") metrics.toolCalls++;
    if (node.kind !== "assistant-step") continue;
    metrics.modelCalls++;
    var data = node.data === void 0 ? {} : node.data;
    var usage = __ch4acko3DshTurnFoldUsage(data.usage);
    if (usage === null) usageReliable = false;
    else {
      usageSamples++;
      metrics.inputTokens += usage.inputTokens;
      metrics.outputTokens += usage.outputTokens;
      metrics.cacheReadTokens += usage.cacheReadTokens;
      metrics.cacheWriteTokens += usage.cacheWriteTokens;
      metrics.reasoningTokens += usage.reasoningTokens;
    }
    var finalNode = data.finalNode;
    var timing = finalNode === void 0 ? void 0 : finalNode.timing;
    var step = typeof data.step === "number" ? data.step : i;
    if (timing !== void 0 && timing.stepStartTime !== null && timing.firstTokenTime !== null && (firstStep === null || step < firstStep)) {
      firstStep = step;
      metrics.timeToFirstToken = Math.max(0, timing.firstTokenTime - timing.stepStartTime);
    }
    if (timing !== void 0 && timing.firstTokenTime !== null && typeof timing.completedTime === "number" && usage !== null) {
      decodeMs += Math.max(0, timing.completedTime - timing.firstTokenTime);
      decodeTokens += usage.outputTokens;
      sampledDecode = true;
    }
  }
  if (sampledDecode && decodeMs > 0) metrics.tokensPerSecond = decodeTokens / (decodeMs / 1000);
  if (!usageReliable) {
    metrics.tokenUsagePartial = usageSamples > 0;
    if (usageSamples === 0) {
      metrics.inputTokens = null;
      metrics.outputTokens = null;
      metrics.cacheReadTokens = null;
      metrics.cacheWriteTokens = null;
      metrics.reasoningTokens = null;
    }
  }
  return metrics;
}
function __ch4acko3DshTurnFoldRender(props) {
  var order = props.order;
  var nodeStore = props.nodeStore;
  var timeline = props.timeline;
  var renderNode = props.renderNode;
  var sessionId = props.sessionId;
  var FOLD_KINDS = {
    "assistant-step": true,
    "context": true,
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
      plan = { turn: turnNum, status: loc.turn.status, endReason: void 0, closingSeq: void 0, closingKey: void 0, closingOrder: -1, closingReasoning: [], tailKey: void 0, branchUnavailable: false, hasAfterClosing: false, hasError: false, activity: [], firstActivityOrder: -1 };
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
      plan.closingReasoning = __ch4acko3DshTurnFoldClosingReasoning(node);
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
    if (FOLD_KINDS[node.kind] === true) {
      if (plan.firstActivityOrder < 0) plan.firstActivityOrder = i;
      plan.activity.push(key);
    }
  }
  var out = [];
  var interactionKeys = __ch4acko3DshTurnFoldInteractionKeys();
  for (i = 0; i < order.length; i++) {
    key = order[i];
    node = nodeStore.get(key);
    if (node === void 0) continue;
    loc = node.location;
    var isTurn = loc !== void 0 && (loc.kind === "turn" || loc.kind === "step");
    plan = isTurn ? plans.get(loc.turn.turn) : void 0;
    var foldable = plan !== void 0 && plan.status === "closed" && (plan.endReason === "completed" || plan.endReason === "aborted" || plan.endReason === "interrupted") && !plan.hasError && !plan.branchUnavailable && !plan.hasAfterClosing && plan.closingKey !== void 0 && (plan.activity.length > 0 || plan.closingReasoning.length > 0) && !plan.activity.some(function (activityKey) { return interactionKeys.has(activityKey); });
    if (foldable && FOLD_KINDS[node.kind] === true && key !== plan.closingKey) continue;
    var summaryAnchor = plan === void 0 ? void 0 : plan.closingKey !== void 0 && (plan.firstActivityOrder < 0 || plan.closingOrder < plan.firstActivityOrder) ? plan.closingKey : plan.activity[0];
    if (plan !== void 0 && !foldable && summaryAnchor !== void 0 && key === summaryAnchor) {
      out.push(react_jsx_runtime.jsx(__ch4acko3DshTurnFoldSummary, {
        completed: plan.endReason === "completed",
        metrics: __ch4acko3DshTurnFoldPlanMetrics(plan, nodeStore, timeline),
        termination: plan.endReason === "aborted" || plan.endReason === "interrupted" ? plan.endReason : void 0,
        running: plan.status !== "closed",
        t: props.t
      }, "ch4acko3-dsh-turn-fold-summary-" + String(sessionId) + "-" + plan.turn));
    }
    if (foldable && key === plan.closingKey) {
      out.push(react_jsx_runtime.jsx(__ch4acko3DshTurnFoldDisclosure, {
        activity: plan.activity,
        closingReasoning: plan.closingReasoning,
        completed: plan.endReason === "completed",
        metrics: __ch4acko3DshTurnFoldPlanMetrics(plan, nodeStore, timeline),
        termination: plan.endReason === "aborted" || plan.endReason === "interrupted" ? plan.endReason : void 0,
        foldKey: String(sessionId) + ":" + plan.turn,
        renderNode: renderNode,
        t: props.t
      }, "ch4acko3-dsh-turn-fold-" + String(sessionId) + "-" + plan.turn));
    }
    var renderedNode = renderNode(key);
    out.push(foldable && key === plan.closingKey && plan.closingReasoning.length > 0 ? react_jsx_runtime.jsx("div", {
      className: "__ch4acko3-dsh-turn-fold__closing",
      children: renderedNode
    }, "ch4acko3-dsh-turn-fold-closing-" + String(sessionId) + "-" + plan.turn) : renderedNode);
  }
  return out;
}
`;
