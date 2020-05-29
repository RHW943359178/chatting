/**
 * koa启动文件，使用es6的import语法
 */
require('babel-register') ({
  presets: [ 'es2015' ]
})

module.exports = require('./index.js')