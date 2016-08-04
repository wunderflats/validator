/* global describe, it */
'use strict'

const expect = require('chai').expect
const emptyStringOr = require('./empty-string-or')
const email = require('./email')

describe('validators/emptyStringOr', function () {
  const emptyStringOrEmail = emptyStringOr(email)

  it('passes if nothing is passed', function () {
    const res = emptyStringOrEmail.validate()
    expect(res).to.have.property('success', true)
    expect(res).to.have.property('error', false)
  })

  it('passes for empty string', function () {
    const res = emptyStringOrEmail.validate('')
    expect(res).to.have.property('success', true)
    expect(res).to.have.property('error', false)
  })

  it('fails if value does not satisfy validator', function () {
    const res = emptyStringOrEmail.validate('hello my friend')
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', 'email')
  })
})
