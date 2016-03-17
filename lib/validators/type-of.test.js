/* global describe, it */
'use strict'

const expect = require('chai').expect
const typeOf = require('./type-of')

describe('validators/typeOf', function () {
  const string = typeOf('string').validate
  const number = typeOf('number').validate
  const bool = typeOf('boolean').validate

  it('passes if field\'s type matches specified type', function () {
    expect(string('a')).to.have.property('success', true)
    expect(number(1)).to.have.property('success', true)
    expect(bool(false)).to.have.property('success', true)
  })

  it('fails if field\'s type matches specified type', function () {
    expect(bool('a')).to.have.property('success', false)
    expect(string(1)).to.have.property('success', false)
    expect(number(false)).to.have.property('success', false)
  })
})
