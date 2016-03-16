'use strict'

const Topo = require('toposort-class')

exports.order = function order (rules) {
  const deps = dependencies(rules)
  const nodeps = Object.keys(rules).filter((field) => !deps[field])
  const order = new Topo()

  Object
    .keys(deps)
    .forEach((field) => order.add(field, deps[field]))

  return order.sort().reverse().concat(nodeps)
}

exports.build = dependencies
exports.inverse = inverse

function inverse (dependencies) {
  return Object
    .keys(dependencies)
    .reduce((inversed, field) => {
      const fieldDeps = dependencies[field]

      return fieldDeps
        .reduce((inversed, dependency) => {
          inversed[dependency] = inversed[dependency]
            ? inversed[dependency].concat(field)
            : [field]

          return inversed
        }, inversed)
    }, {})
}

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
