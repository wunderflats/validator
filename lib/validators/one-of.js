'use strict'

const validation = require('../validation')

module.exports = (opts) => {
  if (!Array.isArray(opts)) {
    throw new Error('Must be initialized with array')
  }

  return { validate }

  function validate (value) {
    const passes = opts.indexOf(value) !== -1
    return validation(passes, 'oneOf:' + opts.join(','))
  }
}
