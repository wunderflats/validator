'use strict'

const validation = require('../validation')
const isYearString = /^[0-9]{4}$/

module.exports = () => {
  return { validate }

  function validate (value) {
    const valid = typeof value === 'string' &&
      isYearString.test(value)

    return validation(valid, 'yearString')
  }
}
