/* global describe, it */
'use strict'

const validators = require('.')
const expect = require('chai').expect

describe('validators', function () {
  it('exports all validators in an object', function () {
    expect(validators.afterDate).to.equal(require('./after-date'))
    expect(validators.beforeDate).to.equal(require('./before-date'))
    expect(validators.containing).to.equal(require('./containing'))
    expect(validators.date).to.equal(require('./date'))
    expect(validators.defined).to.equal(require('./defined'))
    expect(validators.email).to.equal(require('./email'))
    expect(validators.equalTo).to.equal(require('./equal-to'))
    expect(validators.fromField).to.equal(require('./from-field'))
    expect(validators.minLength).to.equal(require('./min-length'))
    expect(validators.typeOf).to.equal(require('./type-of'))
  })
})