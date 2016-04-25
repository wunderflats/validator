/* global describe, it */
'use strict'

const expect = require('chai').expect
const max = require('./max')

describe('validators/max', function () {
  const validator = max(10)

  it('fails if value is higher than max size', function () {
    const res = validator.validate(11)
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', 'max:10')
  })

  it('passes if value is equal to max size', function () {
    expect(validator.validate(10)).to.have.property('success', true)
  })

  it('passes if value is smaller than max size', function () {
    expect(validator.validate(2)).to.have.property('success', true)
  })
})
