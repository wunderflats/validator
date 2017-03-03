'use strict'

const validation = require('../validation')

module.exports = (seed, opts) => {
  opts = Object.assign({ orEqual: false }, opts)

  return { validate }

  function validate (value) {
    const pass = opts.orEqual
      ? (new Date(value)) <= new Date(seed)
      : (new Date(value)) < new Date(seed)

    return validation(pass, 'beforeDate:' + seed)
  }
}
