# dsh-turn-fold

[English](README.md) | 简体中文

一个基于 [dsh-harmony](https://github.com/memorax-ai/dsh-harmony) 的 Provider，为 DSH WebUI 对话添加 Codex Desktop 风格的回合折叠。

https://github.com/user-attachments/assets/3c9dfdcf-a454-4750-9edf-76771ed5a9a6

回合进行期间，摘要栏保持可见，原生思考、说明、命令和工具调用继续流式输出。从第二项开始，连续的推理和工具活动会合并为一个紧凑分组。回合结束后，包括上下文注入在内的已知 Agent 活动会收进最终答复前方的折叠栏。摘要指标可以配置，默认显示耗时、工具调用次数以及输入/输出 token；只有当已加载的回合包含足够数据、无需猜测即可计算时才会展示对应指标。

最终答复通过 `turn-tail.closing.finalNode` 定位，不依赖 `finish_reason` 或 DOM 位置。正常完成、已停止和已中断的回合都会折叠，后两者显示不同的状态标签。当 DSH 将结束分支标记为不可用、结束答复之后仍有节点，或者用户的键盘焦点或文本选择位于活动内容中时，回合会保持展开。失败、达到最大 token、缺少结束节点以及仍在进行的回合也会保持展开，避免隐藏错误或未完成的工作。

展开后仍然使用原生节点渲染器，因此工具详情、复制功能和文件链接都能继续工作。WebUI 保持加载期间，每个会话和回合的展开状态都会被记住。折叠控件提供键盘可见焦点、无障碍状态与操作标签、响应式换行、减少动态效果支持，以及关闭后再卸载活动内容的短暂开合动画。

## 工作原理

两个固定目标的 Source Patch 会在内存中修改 `@deepseek-ai/dsh-client-ui-conversation` 的编译后浏览器包（`lib/client.js`），不会修改已安装的 DSH 文件。

| Patch | 选择器（预期命中 1 次） | 作用 |
| --- | --- | --- |
| `inject-turn-fold-runtime` | `FunctionDeclaration[name.name="ChatView"], VariableStatement:has(VariableDeclaration[name.name="ChatView"])` | 向原生或已装饰的 `ChatView` 注入折叠渲染器和折叠 UI |
| `rewrite-node-render-loop` | `CallExpression[expression.name.name="map"][expression.expression.name="order"]` | 将 `order.map(...)` 节点循环替换为按回合渲染器 |

## 安装

```sh
dsh plugin --profile web add github:CH4ACKO3/dsh-turn-fold
dsh harmony status --profile web   # 两个 Patch 都必须为 `bound`
```

## 测试

```sh
node test/run.cjs
```

`npm install` 会安装仅用于测试的固定版本 DSH 对话包、TypeScript 和 TSQuery。测试套件会在内存中应用两个 Patch、解析最终浏览器包，并覆盖已完成回合、分段活动、结束后活动、部分历史、失败、中断、进行中、无障碍和状态保留等行为。目标缺失或选择器不匹配会使测试失败，不会被报告为跳过后通过。
