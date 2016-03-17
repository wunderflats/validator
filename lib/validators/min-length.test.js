/* global describe, it */
'use strict'

const expect = require('chai').expect
const minLength = require('./min-length')

describe('validators/minLength', function () {
  const validator = minLength(5)

  it('fails if length of value is below', function () {
    const res = validator.validate('1234')
    expect(res).to.have.property('success', false)
    expect(res).have.property('error', 'minLength:5')
  })

  it('passes if length of value is same', function () {
    expect(validator.validate('12345'))
      .to.have.property('success', true)
  })

  it('passes if length of value is above', function () {
    expect(validator.validate('123456'))
      .to.have.property('success', true)
  })
})
