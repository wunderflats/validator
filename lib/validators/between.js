'use strict'

const validation = require('../validation')

module.exports = (min, max) => {
  return { validate }

  function validate (value) {
    return validation(
    (value >= min && value <= max),
    'between:' + min + ',' + max)
  }
}
