'use strict'

const uniq = require('array-uniq')
const flatten = require('flatten')

exports.order = function order (rules) {
  const deps = dependencies(rules)

  return uniq(
    flatten(
      Object
        .keys(rules)
        .map((field) => deps[field]
          ? deps[field].concat(field)
          : field)
    )
  )
}

exports.build = dependencies

function dependencies (rules) {
  return Object
    .keys(rules)
    .reduce((dependencies, field) => {
      const validators = rules[field]

      validators.forEach((validator) => {
        if (!validator.dependsOn) return

        dependencies[field] = (dependencies[field] || [])
          .concat(validator.dependsOn)

        if (dependencies[validator.dependsOn] &&
            dependencies[validator.dependsOn].indexOf(field) !== -1) {
          throw new Error('Circular dependencies between validators found')
        }
      })

      return dependencies
    }, {})
}
