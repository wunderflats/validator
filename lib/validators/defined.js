'use strict'

module.exports = () => {
  return { name: 'defined', validate, acceptsUndefined: true }

  function validate (value, input) {
    return value != null
  }
}
