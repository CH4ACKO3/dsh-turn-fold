'use strict'

const z = require('@deepseek-ai/schemastery')

const SETTINGS_NAMESPACE = 'dsh-turn-fold'

const SUMMARY_FIELDS = [
  'duration',
  'toolCalls',
  'modelCalls',
  'inputTokens',
  'outputTokens',
  'cacheReadTokens',
  'cacheWriteTokens',
  'reasoningTokens',
  'timeToFirstToken',
  'tokensPerSecond',
]

const DEFAULT_SUMMARY_FIELDS = [
  'duration',
  'toolCalls',
  'inputTokens',
  'outputTokens',
]

const Config = z.object({
  summaryFields: z.array(z.union(SUMMARY_FIELDS)).default(DEFAULT_SUMMARY_FIELDS),
})

module.exports = {
  Config,
  DEFAULT_SUMMARY_FIELDS,
  SETTINGS_NAMESPACE,
  SUMMARY_FIELDS,
}
