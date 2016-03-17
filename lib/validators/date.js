'use strict'

const validation = require('../validation')
const validator = require('validator')

module.exports = () => {
  return { validate }

  function validate (value) {
    return validation(
      typeof value === 'string' &&
      validator.isDate(value),
      'date'
    )
  }
}
