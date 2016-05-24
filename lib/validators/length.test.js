/* global describe, it */
'use strict'

const expect = require('chai').expect
const length = require('./length')

describe('validators/length', function () {
  const validator = length(4)

  it('fails for values without length property', function () {
    ;[
      validator.validate({}),
      validator.validate(() => {}),
      validator.validate(1)
    ].forEach(function (res) {
      expect(res).to.have.property('success', false)
      expect(res).to.have.property('error', 'length:4')
    })
  })

  it('fails for strings and arrays of incorrect length', function () {
    ;[
      validator.validate(''),
      validator.validate('a'),
      validator.validate('aa'),
      validator.validate('aaa'),
      validator.validate('aaaaa'),
      validator.validate([]),
      validator.validate([1]),
      validator.validate([1, 2]),
      validator.validate([1, 2, 3]),
      validator.validate([1, 2, 3, 4, 5])
    ].forEach(function (res) {
      expect(res).to.have.property('success', false)
      expect(res).to.have.property('error', 'length:4')
    })
  })

  it('passes for strings and arrays of correct length', function () {
    ;[
      validator.validate([1, 2, 3, 4]),
      validator.validate('aaaa')
    ].forEach(function (res) {
      expect(res).to.have.property('success', true)
      expect(res).to.have.property('error', false)
    })
  })
})
