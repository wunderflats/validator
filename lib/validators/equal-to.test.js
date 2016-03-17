/* global describe, it */
'use strict'

const expect = require('chai').expect
const equalTo = require('./equal-to')

describe('validators/equalTo', function () {
  const validate = equalTo(1).validate

  it('fails if values don\'t match', function () {
    expect(validate('bye')).to.have.property('success', false)
  })

  it('fails if values match only loosely', function () {
    expect(validate('1')).to.have.property('success', false)
  })

  it('passes if values match exactly', function () {
    expect(validate(1)).to.have.property('success', true)
  })
})
