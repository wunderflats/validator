'use strict'

const isPromise = require('is-promise')

module.exports = (field, validator) => {
  return { validate, dependsOn: field }

  function validate (value, input) {
    const validate = validator(input[field]).validate
    const validation = validate(value, input)

    if (isPromise(validation)) return validation.then(resolve)

    return resolve(validation)

    function resolve (validation) {
      return Object.assign(
        validation,
        { error: validation.error
            ? validation.error + '$fromField:' + field
            : false
        }
      )
    }
  }
}
