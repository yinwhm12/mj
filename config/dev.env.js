var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // HOST_URL: "http://39.107.65.67:8091/v1",
  HOST_URL: "http://127.0.0.1:8091/v1",
  PAGE_SHOW_COUNT: 5,
})
