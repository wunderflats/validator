/* global describe, it */
'use strict'

const expect = require('chai').expect
const beforeDate = require('./before-date')

describe('validators/beforeDate', function () {
  const before = new Date(Date.now() - 1000)
  const now = new Date()
  const after = new Date(Date.now() + 1000)
  const validator = beforeDate(now)

  it('fails if value is after specified date', function () {
    expect(validator.validate(after))
      .to.have.property('success', false)
  })

  it('fails if value is same as specified date', function () {
    expect(validator.validate(now))
      .to.have.property('success', false)
  })

  it('passes if value is before specified date', function () {
    expect(validator.validate(before))
      .to.have.property('success', true)
  })

  it('supports strings', function () {
    expect(validator.validate(after.toISOString()))
      .to.have.property('success', false)

    expect(validator.validate(now.toISOString()))
      .to.have.property('success', false)

    expect(validator.validate(before.toISOString()))
      .to.have.property('success', true)
  })
})
