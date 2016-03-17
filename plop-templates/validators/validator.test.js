/* global describe, it */
'use strict'

const expect = require('chai').expect
const {{camelCase name}} = require('./{{dashCase name}}')

describe('validators/{{camelCase name}}', function () {
  const validator = {{camelCase name}}()

  it('fails', function () {
    const res = validator.validate()
    expect(res).to.have.property('success', false)
    expect(res).to.have.property('error', '{{camelCase name}}')
  })
})
