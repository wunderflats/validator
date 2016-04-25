/* global describe, it */
'use strict'

const expect = require('chai').expect
const min = require('./min')

describe('validators/min', function () {
  const validator = min(5)

  it('fails if value is smaller than min size', function () {
    const res = validator.validate(4)
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', 'min:5')
  })

  it('passes if value is equal to min size', function () {
    expect(validator.validate(5)).to.have.property('success', true)
  })

  it('passes if value is higher than min size', function () {
    expect(validator.validate(6)).to.have.property('success', true)
  })
})
