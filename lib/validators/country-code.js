'use strict'

const validation = require('../validation')
const countryCodes = require('country-data')
  .countries.all.map((c) => c.alpha2)

module.exports = () => {
  return { validate }

  function validate (value) {
    const pass = countryCodes.indexOf(value) !== -1
    return validation(pass, 'countryCode')
  }
}
