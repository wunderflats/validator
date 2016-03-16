'use strict'

module.exports = (field) => {
  return {
    name: 'beforeDate:' + field,
    dependsOn: field,
    validate
  }

  function validate (value, input) {
    return (new Date(value)) < new Date(input[field])
  }
}
