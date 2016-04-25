/* global describe, it */
'use strict'

const expect = require('chai').expect
const between = require('./between')

describe('validators/between', function () {
  const validator = between(0, 10)

  it('fails if value is higher than maximum', function () {
    const res = validator.validate(11)
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', 'between:0,10')
  })

  it('fails if value is smaller than minimum', function () {
    const res = validator.validate(-1)
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', 'between:0,10')
  })

  it('passes if value is equal to maximum', function () {
    expect(validator.validate(10)).to.have.property('success', true)
  })

  it('passes if value is equal to minimum', function () {
    expect(validator.validate(0)).to.have.property('success', true)
  })

  it('passes if value is between min and max', function () {
    expect(validator.validate(5)).to.have.property('success', true)
  })
})
