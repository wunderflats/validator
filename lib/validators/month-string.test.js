/* global describe, it */
'use strict'

const expect = require('chai').expect
const monthString = require('./month-string')

describe('validators/monthString', function () {
  const validator = monthString()

  it('fails for non-strings', function () {
    ;[
      validator.validate({}),
      validator.validate(() => {}),
      validator.validate(1),
      validator.validate([])
    ].forEach(function (res) {
      expect(res).to.have.property('success', false)
      expect(res).to.have.property('error', 'monthString')
    })
  })

  it('fails for invalid strings', function () {
    ;[
      validator.validate('1'),
      validator.validate('0'),
      validator.validate('b'),
      validator.validate('-3'),
      validator.validate('0013'),
      validator.validate('0a13'),
      validator.validate('25')
    ].forEach(function (res) {
      expect(res).to.have.property('success', false)
      expect(res).to.have.property('error', 'monthString')
    })
  })

  it('passes for valid strings', function () {
    ;[
      validator.validate('01'),
      validator.validate('02'),
      validator.validate('03'),
      validator.validate('11'),
      validator.validate('12')
    ].forEach(function (res) {
      expect(res).to.have.property('success', true)
      expect(res).to.have.property('error', false)
    })
  })

  it('passes for non-padded strings if `padded = false`', function () {
    const validator = monthString(false)

    ;[
      validator.validate('1'),
      validator.validate('02'),
      validator.validate('03'),
      validator.validate('3'),
      validator.validate('11'),
      validator.validate('12')
    ].forEach(function (res) {
      expect(res).to.have.property('success', true)
      expect(res).to.have.property('error', false)
    })
  })
})
