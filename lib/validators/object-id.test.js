/* global describe, it */
'use strict'

const expect = require('chai').expect
const objectId = require('./object-id')

describe('validators/objectId', function () {
  const validator = objectId()

  it('fails for non-strings', function () {
    ;[
      validator.validate({}),
      validator.validate(() => {}),
      validator.validate(1),
      validator.validate([])
    ].forEach(function (res) {
      expect(res).to.have.property('success', false)
      expect(res).to.have.property('error', 'objectId')
    })
  })

  it('passes for object ids', function () {
    const res = validator.validate('57a30f79401fdfc3db9d75b5')
    expect(res).to.have.property('success', true)
    expect(res).to.have.property('error', false)
  })
})
