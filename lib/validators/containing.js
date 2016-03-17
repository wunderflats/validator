'use strict'

module.exports = (seed) => {
  return { name: 'containing', validate }

  function validate (value) {
    return value.indexOf(seed) !== -1
  }
}
