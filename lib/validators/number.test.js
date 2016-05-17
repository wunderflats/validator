/* global describe, it */
'use strict'

const expect = require('chai').expect
const number = require('./number')

describe('validators/number', function () {
  const validator = number()

  it('fails for strings', function () {
    const res = validator.validate('0')
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', 'number')
  })

  it('fails for objects', function () {
    const res = validator.validate({})
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', 'number')
  })

  it('fails for undefined', function () {
    const res = validator.validate(undefined)
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', 'number')
  })

  it('fails for null', function () {
    const res = validator.validate(null)
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', 'number')
  })

  it('fails for functions', function () {
    const res = validator.validate(() => {})
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', 'number')
  })

  it('fails for arrays', function () {
    const res = validator.validate(() => [])
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', 'number')
  })

  it('fails for NaN', function () {
    const res = validator.validate(NaN)
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', 'number')
  })

  it('passes for numbers', function () {
    const res = validator.validate(1)
    expect(res).to.have.property('success', true)
    expect(res).to.have.property('error', false)
  })
})
