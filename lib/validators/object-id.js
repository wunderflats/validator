'use strict'

const validation = require('../validation')
const ObjectId = require('bson-objectid')

module.exports = () => {
  return { validate }

  function validate (value) {
    const result =
      typeof value === 'string' || typeof value === 'object'
        ? ObjectId.isValid(value)
        : false

    return validation(result, 'objectId')
  }
}
