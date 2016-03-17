/* global describe, it */
'use strict'

const expect = require('chai').expect
const afterDate = require('./after-date')

describe('validators/afterDate', function () {
  const before = new Date(Date.now() - 1000)
  const now = new Date()
  const after = new Date(Date.now() + 1000)

  const validate = afterDate('from').validate

  it('fails if value is before date in field', function () {
    expect(validate(before, { from: now })).to.equal(false)
  })

  it('fails if value is same as date in field', function () {
    expect(validate(now, { from: now })).to.equal(false)
  })

  it('passes if value is after date in field', function () {
    expect(validate(after, { from: now })).to.equal(true)
  })
})
