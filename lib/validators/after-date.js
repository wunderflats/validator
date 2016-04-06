'use strict'

const validation = require('../validation')

module.exports = (date) => {
  return { validate }

  function validate (value, input) {
    const pass = (new Date(value)) > (new Date(date))
    return validation(pass, 'afterDate:' + date)
  }
}
