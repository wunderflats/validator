'use strict'

const validation = require('../validation')

module.exports = () => {
  return { validate }

  function validate (value) {
    return validation(false, '{{camelCase name}}')
  }
}
