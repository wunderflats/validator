'use strict'

module.exports = (seed) => {
  return { name: 'value:' + seed, validate }

  function validate (value) {
    return value === seed
  }
}
