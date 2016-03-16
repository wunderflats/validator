'use strict'

module.exports = () => {
  return { name: '{{camelCase name}}', validate }

  function validate (value) {
    return false
  }
}
