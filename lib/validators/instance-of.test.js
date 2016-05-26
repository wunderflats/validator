/* global describe, it */
'use strict'

const expect = require('chai').expect
const instanceOf = require('./instance-of')

describe('validators/instanceOf', function () {
  const validator = instanceOf(Date)

  it('fails if value is not of instance of provided function', function () {
    const res = validator.validate(new RegExp('Date'))
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', 'instanceOf:Date')
  })

  it('passes if value is instance of provided function', function () {
    const res = validator.validate(new Date())
    expect(res).to.have.property('success', true)
    expect(res).to.have.property('error', false)
  })
})
