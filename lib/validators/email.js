'use strict'

const validation = require('../validation')
const validator = require('validator')

module.exports = () => {
  return { validate }

  function validate (value) {
    return validation(validator.isEmail(value), 'email')
  }
}
