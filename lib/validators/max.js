'use strict'

const validation = require('../validation')

module.exports = (size) => {
  return { validate }

  function validate (value) {
    return validation(value <= size, 'max:' + size)
  }
}
