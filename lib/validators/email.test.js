/* global describe, it */
'use strict'

const expect = require('chai').expect
const email = require('./email')

describe('validators/email', function () {
  const validator = email()

  it('fails if value is not an email', function () {
    expect(validator.validate('hello'))
      .to.equal(false)
  })

  it('passes if value is an email', function () {
    expect(validator.validate('hello@world.com'))
      .to.equal(true)
  })
})
