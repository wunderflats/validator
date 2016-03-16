'use strict'

const validator = require('validator')

module.exports = () => {
  return { name: 'date', validate }

  function validate (value) {
    if (typeof value !== 'string') {
      return false
    }

    return validator.isDate(value)
  }
}
