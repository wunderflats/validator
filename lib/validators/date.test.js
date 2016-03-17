/* global describe, it */
'use strict'

const expect = require('chai').expect
const date = require('./date')

describe('validators/date', function () {
  const validator = date()

  it('fails if value is not a date', function () {
    expect(validator.validate('hello'))
      .to.have.property('success', false)
  })

  it('fails if value is a unix timestamp', function () {
    expect(validator.validate(9287123))
      .to.have.property('success', false)
  })

  it('passes if value is a date string', function () {
    expect(validator.validate('2016-01-01'))
      .to.have.property('success', true)
  })
})
