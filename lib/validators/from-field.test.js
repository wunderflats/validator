/* global describe, it */
'use strict'

const sinon = require('sinon')
const expect = require('chai').expect
const validation = require('../validation')
const fromField = require('./from-field')

describe('validators/fromField', function () {
  it('composes the error message from its validator', function () {
    const sameAs = function (seed) {
      return { validate }

      function validate (value) {
        return validation(value === seed, 'sameAs:' + seed)
      }
    }

    const input = {
      password: '123',
      passwordConfirmation: '321'
    }

    const validate = fromField('password', sameAs).validate

    expect(validate(input.passwordConfirmation, input))
      .to.have.property('error', 'sameAs:123$fromField:password')
  })

  it('constructs its validator with the value of the specified field', function () {
    const sameAs = sinon.spy(function (seed) {
      return { validate }

      function validate (value) {
        return validation(value === seed, 'sameAs:' + seed)
      }
    })

    const input = {
      password: '123',
      passwordConfirmation: '123'
    }

    const validate = fromField('password', sameAs).validate
    const res = validate(input.passwordConfirmation, input)

    expect(res).to.have.property('success', true)
    expect(res).to.have.property('error', false)
    expect(sameAs.calledWith('123')).to.equal(true)
  })
})
