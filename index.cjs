'use strict'

// Host entry for the @ch4acko3/dsh-turn-fold Harmony provider.
const { settingsNamespace } = require('@deepseek-ai/dsh-settings')
const { Config, SETTINGS_NAMESPACE } = require('./settings.cjs')

exports.Config = Config
exports.inject = ['harmony']
exports.apply = (ctx, config) => {
  ctx.inject(['settings'], (settingsCtx) => {
    settingsCtx.settings.register(settingsNamespace(SETTINGS_NAMESPACE), Config, { base: config })
  })
}
