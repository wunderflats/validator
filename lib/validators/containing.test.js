/* global describe, it */
'use strict'

const expect = require('chai').expect
const containing = require('./containing')

describe('validators/containing', function () {
  const validate = containing('hello').validate

  it('fails if string doesn\'t contain specified string', function () {
    expect(validate('bye')).to.equal(false)
  })

  it('fails if array doesn\'t contain specified element', function () {
    expect(validate(['bye', 'world'])).to.equal(false)
  })

  it('passes if array contains specified element', function () {
    expect(validate(['hello', 'world'])).to.equal(true)
  })

  it('passes if string contains specified string', function () {
    expect(validate('i say hello world')).to.equal(true)
  })
})
