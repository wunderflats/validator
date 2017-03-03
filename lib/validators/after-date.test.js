/* global describe, context, it */
'use strict'

const expect = require('chai').expect
const afterDate = require('./after-date')

describe('validators/afterDate', function () {
  const before = new Date(Date.now() - 1000)
  const now = new Date()
  const after = new Date(Date.now() + 1000)

  const validate = afterDate(now).validate

  it('fails if value is before specified date', function () {
    expect(validate(before))
      .to.have.property('success', false)
  })

  it('fails if value is same as specified date', function () {
    expect(validate(now))
      .to.have.property('success', false)
  })

  it('passes if value is after specified date', function () {
    expect(validate(after))
      .to.have.property('success', true)
  })

  context('with option orEqual: true', function () {
    const validate = afterDate(now, { orEqual: true }).validate

    it('fails if value is before specified date', function () {
      expect(validate(before))
        .to.have.property('success', false)
    })

    it('passes if value is after specified date', function () {
      expect(validate(after))
        .to.have.property('success', true)
    })

    it('passes if value is after specified date', function () {
      expect(validate(now))
        .to.have.property('success', true)
    })
  })
})
