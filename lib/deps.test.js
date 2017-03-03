/* global describe, it */
'use strict'

const deps = require('./deps')
const expect = require('chai').expect

describe('deps', function () {
  describe('build', function () {
    it('returns hash of field: [dependingField]', function () {
      const rules = {
        a: [ m('b'), m('c'), m('d') ],
        b: [ m() ],
        d: [ m('c') ],
        c: [ m('b') ]
      }

      expect(deps.build(rules)).to.deep.equal({
        a: [ 'b', 'c', 'd' ],
        d: [ 'c' ],
        c: [ 'b' ]
      })
    })
  })

  describe('inverse', function () {
    it('inverses hash of field: [dependingField]', function () {
      const dependencies = {
        a: [ 'b', 'c', 'd' ],
        d: [ 'c' ],
        c: [ 'b' ]
      }

      expect(deps.inverse(dependencies)).to.deep.equal({
        b: [ 'a', 'c' ],
        c: [ 'a', 'd' ],
        d: [ 'a' ]
      })
    })
  })

  describe('order', function () {
    it('array of fields in order that they should be validated', function () {
      const rules = {
        a: [ m('b'), m('d'), m('c') ],
        b: [ m() ],
        d: [ m('c') ],
        c: [ m('b') ]
      }

      const order = deps.order(rules)

      expect(i(order, 'a')).to.be.above(i(order, 'b'))
      expect(i(order, 'a')).to.be.above(i(order, 'd'))
      expect(i(order, 'a')).to.be.above(i(order, 'c'))
      expect(i(order, 'd')).to.be.above(i(order, 'c'))
      expect(i(order, 'c')).to.be.above(i(order, 'b'))

      function i (arr, item) {
        return arr.indexOf(item)
      }
    })
  })

  function m (dependsOn) {
    return { dependsOn, validate }

    function validate () {
      return { success: true, error: false }
    }
  }
})
