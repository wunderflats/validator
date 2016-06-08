'use strict'

const validation = require('../validation')

module.exports = () => {
  return { validate }

  function validate (value) {
    return validation(Array.isArray(value), 'array')
  }
}
