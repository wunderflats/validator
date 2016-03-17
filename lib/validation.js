'use strict'

module.exports = function validation (success, error) {
  return {
    success,
    error: !success ? error : false
  }
}
