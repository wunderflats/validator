'use strict'

const validation = require('../validation')

module.exports = () => {
  return { validate }

  function validate (value) {
    const pass = !isNaN(value) && (typeof value) === 'number'
    return validation(pass, 'number')
  }
}
