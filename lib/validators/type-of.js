'use strict'

const validation = require('../validation')

module.exports = (type) => {
  return { validate }

  function validate (value) {
    return validation(typeof value === type, 'typeOf:' + type)
  }
}
