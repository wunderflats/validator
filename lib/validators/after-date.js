'use strict'

const validation = require('../validation')

module.exports = (date, opts) => {
  opts = Object.assign({ orEqual: false }, opts)

  return { validate }

  function validate (value, input) {
    const pass = opts.orEqual
      ? (new Date(value)) >= (new Date(date))
      : (new Date(value)) > (new Date(date))

    return validation(pass, 'afterDate:' + date)
  }
}
