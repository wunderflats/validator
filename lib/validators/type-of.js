'use strict'

module.exports = (type) => {
  return {
    name: 'typeOf:' + type,
    validate
  }

  function validate (value) {
    return typeof value === type
  }
}
