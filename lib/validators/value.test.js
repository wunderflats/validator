/* global describe, it */
'use strict'

const expect = require('chai').expect
const value = require('./value')

describe('validators/value', function () {
  const validate = value(1).validate

  it('fails if values don\'t match', function () {
    expect(validate('bye')).to.equal(false)
  })

  it('fails if values match only loosely', function () {
    expect(validate('1')).to.equal(false)
  })

  it('passes if values match exactly', function () {
    expect(validate(1)).to.equal(true)
  })
})
