'use strict'

// Host entry for the @ch4acko3/dsh-turn-fold Harmony provider.
const { Config, SETTINGS_NAMESPACE, createSettingsSchema } = require('./settings.cjs')

exports.Config = Config
exports.inject = ['harmony']
exports.apply = (ctx, config) => {
  ctx.inject(['settings'], (settingsCtx) => {
    settingsCtx.settings.register(SETTINGS_NAMESPACE, createSettingsSchema(), { base: config })
  })
}
