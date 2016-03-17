'use strict'

module.exports = (field) => {
  return {
    name: 'afterDate:' + field,
    dependsOn: field,
    validate
  }

  function validate (value, input) {
    return (new Date(value)) > new Date(input[field])
  }
}
