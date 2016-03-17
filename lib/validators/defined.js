'use strict'

const validation = require('../validation')

module.exports = () => {
  return { validate, acceptsUndefined: true }

  function validate (value, input) {
    return validation(value != null, 'defined')
  }
}
