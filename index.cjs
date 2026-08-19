// Host entry for the dsh-turn-fold Harmony provider.
// The actual behavior lives in ./patch.cjs, which Harmony discovers through
// `dsh.harmony.patches` in package.json. This entry only needs to be a valid
// Cordis plugin so the provider participates in the loader tree.
exports.inject = ['harmony']
exports.apply = () => {}
