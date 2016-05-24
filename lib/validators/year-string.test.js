/* global describe, it */
'use strict'

const expect = require('chai').expect
const yearString = require('./year-string')

describe('validators/yearString', function () {
  const validator = yearString()

  it('fails for non-strings', function () {
    ;[
      validator.validate({}),
      validator.validate(() => {}),
      validator.validate(1),
      validator.validate([])
    ].forEach(function (res) {
      expect(res).to.have.property('success', false)
      expect(res).to.have.property('error', 'yearString')
    })
  })

  it('fails for invalid strings', function () {
    ;[
      validator.validate('1'),
      validator.validate('0'),
      validator.validate('-3'),
      validator.validate('YYYY'),
      validator.validate('a'),
      validator.validate('-2016'),
      validator.validate('25')
    ].forEach(function (res) {
      expect(res).to.have.property('success', false)
      expect(res).to.have.property('error', 'yearString')
    })
  })

  it('passes for valid strings', function () {
    ;[
      validator.validate('0000'),
      validator.validate('2015')
    ].forEach(function (res) {
      expect(res).to.have.property('success', true)
      expect(res).to.have.property('error', false)
    })
  })
})
