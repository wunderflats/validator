'use strict'

const validation = require('../validation')

module.exports = (seed) => {
  return { validate }

  function validate (value) {
    return validation((new Date(value)) < new Date(seed),
      'beforeDate:' + seed)
  }
}
