/* global describe, it */
'use strict'

const expect = require('chai').expect
const defined = require('./defined')

describe('validators/defined', function () {
  const validator = defined()

  it('fails if value is null', function () {
    const result = validator.validate(null)
    expect(result).to.equal(false)
  })

  it('fails if value is undefined', function () {
    const result = validator.validate(undefined)
    expect(result).to.equal(false)
  })

  it('passes if value is \'\'', function () {
    const result = validator.validate('')
    expect(result).to.equal(true)
  })

  it('passes if value is false', function () {
    const result = validator.validate(false)
    expect(result).to.equal(true)
  })

  it('passes if value is 0', function () {
    const result = validator.validate(0)
    expect(result).to.equal(true)
  })

  it('passes if value is \'0\'', function () {
    const result = validator.validate('0')
    expect(result).to.equal(true)
  })
})
