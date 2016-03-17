'use strict'

const validation = require('../validation')

module.exports = (minLength) => {
  return { validate }

  function validate (value) {
    return validation(value.length >= minLength,
      'minLength:' + minLength)
  }
}
