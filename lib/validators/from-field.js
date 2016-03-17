'use strict'

module.exports = (field, validator) => {
  return { validate, dependsOn: field }

  function validate (value, input) {
    const validate = validator(input[field]).validate
    const validation = validate(value, input)

    return Object.assign(
      validation,
      { error: validation.error
          ? validation.error + '$fromField:' + field
          : false
      }
    )
  }
}
