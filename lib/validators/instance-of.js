'use strict'

const validation = require('../validation')

module.exports = (type) => {
  return { validate }

  function validate (value) {
    return validation(value instanceof type, 'instanceOf:' + type.name)
  }
}
