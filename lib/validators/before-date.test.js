/* global describe, it */
'use strict'

const expect = require('chai').expect
const beforeDate = require('./before-date')

describe('validators/beforeDate', function () {
  const before = new Date(Date.now() - 1000)
  const now = new Date()
  const after = new Date(Date.now() + 1000)
  const validator = beforeDate('to')

  it('fails if value is after date in field', function () {
    expect(validator.validate(after, { to: now }))
      .to.equal(false)
  })

  it('fails if value is same as date in field', function () {
    expect(validator.validate(now, { to: now }))
      .to.equal(false)
  })

  it('passes if value is before date in field', function () {
    expect(validator.validate(before, { to: now }))
      .to.equal(true)
  })

  it('supports strings', function () {
    expect(validator.validate('2016-01-01', { to: '2015-01-01' }))
      .to.equal(false)

    expect(validator.validate('2016-01-01', { to: '2016-01-01' }))
      .to.equal(false)

    expect(validator.validate('2016-01-01', { to: '2016-01-02' }))
      .to.equal(true)
  })
})
