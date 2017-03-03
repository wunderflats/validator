/* global describe, it */
'use strict'

const expect = require('chai').expect
const url = require('./url')

describe('validators/url', function () {
  const validator = url()

  it('fails for normal strings', function () {
    const res = validator.validate('hello')
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', 'url')
  })

  it('fails for unknown protocols', function () {
    const res = validator.validate('webcal://hello.com')
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', 'url')
  })

  it('passes for http', function () {
    const res = validator.validate('http://hello.com')
    expect(res).to.have.property('success', true)
    expect(res).to.have.property('error', false)
  })

  it('passes for specified protocols', function () {
    const validator = url({ protocols: [ 'webcal' ] })
    const res = validator.validate('webcal://hello.com')
    expect(res).to.have.property('error', false)
  })
})
