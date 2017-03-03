'use strict'

const validation = require('../validation')

module.exports = () => {
  return { validate }

  function validate (value) {
    return validation(
      typeof value === 'string' &&
      !isNaN(Date.parse(value)),
      'date'
    )
  }
}
