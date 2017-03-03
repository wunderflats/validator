/* global describe, context, it */
'use strict'

const sinon = require('sinon')
const chai = require('chai').use(require('chai-as-promised'))
const expect = chai.expect
const date = require('./validators/date')
const defined = require('./validators/defined')
const email = require('./validators/email')
const validation = require('./validation')
const validator = require('.')

describe('validator', function () {
  context('async', function () {
    it('supports asynchronous validations', function () {
      const validate = validator({
        yes: [ asyncTrue() ],
        y: [ asyncTrue() ]
      }, { async: true })

      return expect(validate({ yes: true, y: false }))
        .to.eventually.deep.equal({
          y: 'mustBeTrue'
        })

      function asyncTrue () {
        return { validate }

        function validate (value) {
          return Promise.resolve(
            validation(value === true, 'true')
          )
        }
      }
    })
  })

  context('throwing', function () {
    class CustomError extends Error {
      constructor (fields) {
        super()

        this.name = 'CustomError'
        this.fields = fields
      }
    }

    it('throws an error if `throwing` is not a function', function () {
      expect(() => validator({ a: [ defined() ] }, { throwing: true }))
        .to.throw(Error, /.* constructor .* throwing validators/)
    })

    it('throws instance of custom error constructor in case of errors', function () {
      const validate = validator({ a: [ defined() ] },
        { throwing: CustomError })

      expect(() => validate({})).to.throw(CustomError)
    })

    it('returns input in case of no errors', function () {
      const validate = validator({ a: [ defined() ] },
        { throwing: CustomError })

      expect(validate({ a: 'hello' })).to.deep.equal({ a: 'hello' })
    })

    it('rejects with CustomError in case of errors [async]', function () {
      const validate = validator({ a: [ defined() ] },
        { throwing: CustomError, async: true })

      return expect(validate({})).to.eventually
        .be.rejectedWith(CustomError)
    })

    it('resolves to input in case of no errors [async]', function () {
      const validate = validator({ a: [ defined() ] },
        { throwing: CustomError, async: true })

      return expect(validate({ a: 'hello' })).to.eventually
        .deep.equal({ a: 'hello' })
    })
  })

  it('throws an error if a validator returns a promise in a synchronous validator', function () {
    const validate = validator({
      yes: [ asyncTrue() ]
    })

    const input = { yes: true }

    expect(() => validate(input))
      .to.throw(/async/i)

    function asyncTrue () {
      return { validate }

      function validate (value) {
        return Promise.resolve(
          validation(value === true, 'true')
        )
      }
    }
  })

  it('allows passing of validators as functions', function () {
    const validate = validator({
      a: [ defined ],
      b: defined,
      c: defined()
    })

    const passing = {
      a: 'hello',
      b: 'bye',
      c: 'world'
    }

    const failing = {}

    expect(validate(passing)).to.equal(null)
    expect(validate(failing)).to.deep.equal({
      a: 'mustBeDefined',
      b: 'mustBeDefined',
      c: 'mustBeDefined'
    })
  })

  it('gracefully accepts falsey values as input', function () {
    const validate = validator({ a: [ defined() ] })
    expect(() => validate()).to.not.throw()
  })

  it('allows passing of single validators without array', function () {
    const validate = validator({
      a: defined
    })

    const passing = {
      a: 'hello'
    }

    const failing = {}

    expect(validate(passing)).to.equal(null)
    expect(validate(failing)).to.deep.equal({
      a: 'mustBeDefined'
    })
  })

  it('does not run validators if previous ones have failed', function () {
    const $1 = pass()
    const $2 = pass()
    const $3 = fail()
    const $4 = pass()
    const $5 = fail()

    const rules = {
      a: [ $1, $2, $3, $4, $5 ]
    }

    const input = {
      a: 'hello'
    }

    rules.a.forEach(($v) => sinon.spy($v, 'validate'))

    const validate = validator(rules)

    expect(validate(input)).to.deep.equal({
      a: 'mustBeFailed'
    })

    expect($1.validate.called).to.equal(true)
    expect($2.validate.called).to.equal(true)
    expect($3.validate.called).to.equal(true)
    expect($4.validate.called).to.equal(false)
    expect($5.validate.called).to.equal(false)

    function fail () {
      return { validate }

      function validate () {
        return validation(false, 'failed')
      }
    }

    function pass () {
      return { validate }

      function validate () {
        return validation(true, 'passed')
      }
    }
  })

  it('returns object with the first failing validation when run', function () {
    const validate = validator({
      firstName: [ defined() ],
      email: [ defined(), email() ]
    })

    const input = {}

    expect(validate(input)).to.deep.equal({
      firstName: 'mustBeDefined',
      email: 'mustBeDefined'
    })
  })

  it('does not contain passing properties when run', function () {
    const validate = validator({
      firstName: [ defined() ],
      email: [ defined(), email() ]
    })

    const input = {
      firstName: 'Max'
    }

    expect(validate(input)).to.deep.equal({
      email: 'mustBeDefined'
    })
  })

  it('returns null if everything is ok', function () {
    const validate = validator({
      firstName: [ defined() ],
      lastName: [ defined() ]
    })

    const input = {
      firstName: 'Max',
      lastName: 'Schmitt'
    }

    expect(validate(input)).to.equal(null)
  })

  it('supports nested objects', function () {
    const validate = validator({
      name: {
        first: [ defined() ],
        last: [ defined() ]
      },
      website: {
        url: [ defined() ],
        title: [ defined() ]
      }
    })

    const input = {
      name: {
        first: 'Max',
        last: 'Schmitt'
      },
      website: {
        url: 'http://maximilianschmitt.me'
      }
    }

    expect(validate(input)).to.deep.equal({
      website: {
        title: 'mustBeDefined'
      }
    })
  })

  it('does not run validators on non-existent inputs', function () {
    const validate = validator({
      email: [ email() ]
    })

    const input = {}

    expect(validate(input)).to.equal(null)
  })

  it('runs validators of optional fields when they have a value', function () {
    const validate = validator({
      email: [ email() ]
    })

    const input = { email: 'hello' }

    expect(validate(input)).to.deep.equal({
      email: 'mustBeEmail'
    })
  })

  it('runs validators on non-existent inputs if validator specifies acceptsUndefined', function () {
    const validate = validator({
      email: [ defined(), email() ]
    })

    const input = {}

    expect(validate(input)).to.deep.equal({
      email: 'mustBeDefined'
    })
  })

  it('contains only failing validations', function () {
    const validate = validator({
      firstName: [ defined() ],
      email: [ defined(), email() ]
    })

    const input = {
      email: 'maximilian'
    }

    expect(validate(input)).to.deep.equal({
      firstName: 'mustBeDefined',
      email: 'mustBeEmail'
    })
  })

  context('dependencies', function () {
    it('runs validators of dependencies first', function () {
      const $unequalTo = unequalTo('lastName')
      const $string = string()

      const dependent = sinon.spy($unequalTo, 'validate')
      const dependency = sinon.spy($string, 'validate')

      const validate = validator({
        firstName: [ string(), $unequalTo ],
        lastName: [ $string ]
      })

      const input = {
        firstName: 'Max',
        lastName: 'Schmitt'
      }

      expect(validate(input)).to.equal(null)
      expect(dependency.calledBefore(dependent)).to.equal(true)
    })

    it('does not run validator if a dependency is invalid', function () {
      const $unequalTo = unequalTo('lastName')
      const dependent = sinon.spy($unequalTo, 'validate')

      const validate = validator({
        firstName: [ string(), $unequalTo ],
        lastName: [ string() ]
      })

      const input = {
        firstName: 'Max',
        lastName: 123
      }

      expect(validate(input)).to.deep.equal({
        lastName: 'mustBeString'
      })

      expect(dependent.callCount).to.equal(0)
    })

    it('throws an error if there are circular dependencies', function () {
      expect(() => validator({
        firstName: [ unequalTo('lastName') ],
        lastName: [ unequalTo('firstName') ]
      })).to.throw(/circular/i)
    })

    it('fails if a dependency is undefined', function () {
      const validate = validator({
        from: [ date(), unequalTo('to') ],
        to: [ date() ]
      })

      const input = {
        from: '2016-01-01'
      }

      expect(validate(input)).to.deep.equal({
        to: 'mustBeDefined'
      })
    })

    it('passes if self and dependency are optional and missing', function () {
      const validate = validator({
        from: [ date(), unequalTo('to') ],
        to: [ date() ]
      })

      const input = {}

      expect(validate(input)).to.equal(null)
    })
  })
})

function string () {
  return { validate }

  function validate (value) {
    return validation(typeof value === 'string', 'string')
  }
}

function unequalTo (field) {
  return {
    validate,
    dependsOn: field
  }

  function validate (value, input) {
    return validation(value !== input[field], 'unequalTo:' + field)
  }
}
