'use strict'
const debug = require('debug')

module.exports = class Logger {
  static trace (msg, data) {
    debug('trace')(msg, data)
  }

  static warn (msg, data) {
    debug('warn')(msg, data)
  }
}
