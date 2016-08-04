'use strict'

const validation = require('../validation')
const objectid = require('objectid')

module.exports = () => {
  return { validate }

  function validate (value) {
    return validation(objectid.isValid(value), 'objectId')
  }
}
