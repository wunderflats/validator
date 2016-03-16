'use strict'

const validator = require('validator')

module.exports = () => {
  return { name: 'email', validate }

  function validate (value) {
    return validator.isEmail(value)
  }
}
