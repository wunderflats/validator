'use strict'

const validation = require('../validation')
const validator = require('validator')

module.exports = (options) => {
  return { validate }

  function validate (value) {
    const pass = validator.isURL(value, options)
    return validation(pass, 'url')
  }
}
