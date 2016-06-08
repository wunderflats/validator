/* global describe, it */
'use strict'

const expect = require('chai').expect
const array = require('./array')

describe('validators/array', function () {
  const validator = array()

  it('fails for non-arrays', function () {
    const cases = [
      {},
      '',
      0,
      Function.prototype,
      new Date(),
      undefined,
      null,
      { '0': 1, '1': 2, length: 2 },
      { 0: 1, 1: 2, length: 2 },
      { length: 0 }
    ]

    cases.forEach(function (value) {
      const res = validator.validate(value)
      expect(res).to.have.property('success', false)
      expect(res).to.have.property('error', 'array')
    })
  })

  it('passes for arrays', function () {
    const res = validator.validate([])
    expect(res).to.have.property('success', true)
    expect(res).to.have.property('error', false)
  })
})
