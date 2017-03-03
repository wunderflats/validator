'use strict'

const isPromise = require('is-promise')

module.exports = function () {
  const field = arguments[0]
  const validator = arguments[1]
  const validatorArgs = Array.from(arguments).slice(2)

  return { validate, dependsOn: field }

  function validate (value, input) {
    const validate = validator
      .apply(null, [ input[field] ].concat(validatorArgs))
      .validate

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
