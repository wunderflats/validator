'use strict'

const validation = require('../validation')

module.exports = (validator) => {
  return { validate }

  function validate (value) {
    if (value === '' || value == null) {
      return validation(true, 'string')
    }

    return validator().validate.apply(null, arguments)
  }
}
