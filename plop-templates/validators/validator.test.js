/* global describe, it */
'use strict'

const expect = require('chai').expect
const {{camelCase name}} = require('./{{dashCase name}}')

describe('validators/{{camelCase name}}', function () {
  const validator = {{camelCase name}}()

  it('fails', function () {
    expect(validator.validate())
      .to.equal(false)
  })
})
