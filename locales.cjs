'use strict'

const dictionaries = {
  en: require('./locales/en.json'),
  zh: require('./locales/zh.json'),
}

const expected = Object.keys(dictionaries.en).sort()
for (const [locale, dictionary] of Object.entries(dictionaries)) {
  const actual = Object.keys(dictionary).sort()
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`@ch4acko3/dsh-turn-fold: locale ${locale} does not match the English key set`)
  }
  for (const [key, value] of Object.entries(dictionary)) {
    if (typeof value !== 'string' || value.length === 0) {
      throw new Error(`@ch4acko3/dsh-turn-fold: locale ${locale} has an invalid value for ${key}`)
    }
  }
}

module.exports = dictionaries
