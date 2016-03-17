'use strict'

const deps = require('./deps')
const isPromise = require('is-promise')
const flat = require('flat')
const async = require('async-q')

module.exports = function validator (rules, opts) {
  opts = opts || {}
  const isAsync = opts.async || false

  const flatRules = sugarize(flat(rules, { safe: true }))
  const orderedFields = deps.order(flatRules)

  return function validate (input) {
    const flatInput = flat(input, { safe: true })

    const reducer = (errors, field) =>
      runValidators(flatInput, flatRules, isAsync, errors, field)

    if (isAsync) {
      return async
        .reduce(orderedFields, {}, reducer)
        .then(resolve)
    }

    return resolve(orderedFields.reduce(reducer, {}))
  }

  function resolve (errors) {
    return Object.keys(errors).length ? flat.unflatten(errors) : null
  }
}

function runValidators (input, rules, isAsync, errors, field) {
  const value = input[field]
  const validators = rules[field]

  if (isAsync) {
    return async.reduce(validators, errors, runValidator)
  }

  return validators.reduce(runValidator, errors)

  function runValidator (errors, validator) {
    // skip if we already have errors
    if (errors[field]) {
      return errors
    }

    if (typeof value === 'undefined' && !validator.acceptsUndefined) {
      return errors
    }

    const dependency = validator.dependsOn

    // don't run if dependency failed validation
    if (dependency && errors[dependency]) {
      return errors
    }

    // fail if a dependency is not defined
    if (dependency && typeof input[dependency] === 'undefined') {
      errors[dependency] = errorMessage('defined')
      return errors
    }

    const validation = validator.validate(value, input)

    if (isPromise(validation)) {
      if (!isAsync) {
        throw new Error(validator.name + ' is asynchronous, but the validator you built is missing the async option')
      }
      return validation.then(resolve)
    }

    return resolve(validation)

    function resolve (validation) {
      if (validation.success) return errors
      errors[field] = errorMessage(validation.error)
      return errors
    }
  }
}

function errorMessage (validatorName) {
  return 'mustBe' +
    validatorName.charAt(0).toUpperCase() +
    validatorName.slice(1)
}

function sugarize (rules) {
  // allow to pass in functions instead of objects
  const f = (f) => typeof f === 'function' ? f() : f

  return Object
    .keys(rules)
    .reduce((sugared, field) => {
      const validators = rules[field]

      // allow field: validator (not array)
      sugared[field] = Array.isArray(validators)
        ? validators.map(f)
        : [validators].map(f)

      return sugared
    }, {})
}
