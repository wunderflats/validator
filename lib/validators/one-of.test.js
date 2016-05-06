/* global describe, it */
'use strict'

const expect = require('chai').expect
const oneOf = require('./one-of')

describe('validators/oneOf', function () {
  const validator = oneOf(['hello', 'world', 'foo', 'bar'])

  it('throws an error if seed is not an array', function () {
    expect(() => validator()).to.throw
  })

  it('fails if value is not included in seed', function () {
    const res = validator.validate('baz')
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', 'oneOf:hello,world,foo,bar')
  })

  it('passes if value is included in seed', function () {
    const res = validator.validate('world')
    expect(res).to.have.property('success', true)
    expect(res).to.have.property('error', false)
  })
})
