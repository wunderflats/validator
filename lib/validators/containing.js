'use strict'

const validation = require('../validation')

module.exports = (seed) => {
  return { validate }

  function validate (value) {
    return validation(value.indexOf(seed) !== -1,
      'containing:' + seed)
  }
}
