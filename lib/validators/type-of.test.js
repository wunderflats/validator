/* global describe, it */
'use strict'

const expect = require('chai').expect
const typeOf = require('./type-of')

describe('validators/a', function () {
  const string = typeOf('string').validate
  const number = typeOf('number').validate
  const bool = typeOf('boolean').validate

  it('passes if field\'s type matches specified type', function () {
    expect(string('a')).to.equal(true)
    expect(number(1)).to.equal(true)
    expect(bool(false)).to.equal(true)
  })

  it('fails if field\'s type matches specified type', function () {
    expect(bool('a')).to.equal(false)
    expect(string(1)).to.equal(false)
    expect(number(false)).to.equal(false)
  })
})
