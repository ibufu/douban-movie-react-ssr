if (__NODE__) {
  module.exports = require('./configureStore.node')
} else {
  module.exports = require('./configureStore.dev')
}