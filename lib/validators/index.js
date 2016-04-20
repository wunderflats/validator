'use strict'

const fs = require('fs')
const camelCase = require('camelcase')

const files = fs.readdirSync(__dirname)

module.exports = files
  .filter(onlyValidators)
  .reduce(exportObject, {})

function onlyValidators (file) {
  return /\.js$/.test(file) &&
    !/test\.js/.test(file) &&
    file !== 'index.js'
}

function exportObject (o, file) {
  o[propertyName(file)] = require('./' + file)
  return o
}

function propertyName (file) {
  return camelCase(file.substr(0, file.indexOf('.')))
}
