'use strict'

const validation = require('../validation')
const isNumeric = /^[0-9]+$/

module.exports = (padded) => {
  return { validate }

  function validate (value) {
    const valid = typeof value === 'string' &&
      (Number(value) >= 1 && Number(value) <= 13) &&
      isNumeric.test(value) &&
      (padded === false ? true : value.length === 2)

    return validation(valid, 'monthString')
  }
}
