/* global describe, it */
'use strict'

const expect = require('chai').expect
const countryCode = require('./country-code')

describe('validators/countryCode', function () {
  const validator = countryCode()

  it('fails for non-country codes', function () {
    ;[
      'de',
      '==',
      0,
      {},
      [],
      ''
    ].forEach(function (input) {
      const res = validator.validate(input)
      expect(res).to.have.property('success', false)
      expect(res).to.have.property('error', 'countryCode')
    })
  })

  it('passes for country codes', function () {
    ;[
      'DE',
      'UK',
      'US'
    ].forEach(function (input) {
      const res = validator.validate(input)
      expect(res).to.have.property('success', true)
      expect(res).to.have.property('error', false)
    })
    const res = validator.validate()
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', 'countryCode')
  })
})
