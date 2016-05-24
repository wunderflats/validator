'use strict'

const validation = require('../validation')

module.exports = (length) => {
  return { validate }

  function validate (value) {
    const valid = value != null &&
      value.length != null &&
      value.length === length

    return validation(valid, 'length:' + length)
  }
}
