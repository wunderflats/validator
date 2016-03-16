/* global describe, it */
'use strict'

const deps = require('./deps')
const expect = require('chai').expect

describe('deps', function () {
  describe('build', function () {
    it('returns hash of field: [dependingField]', function () {
      const rules = {
        a: [m('b'), m('c'), m('d')],
        b: [m()],
        d: [m('c')],
        c: [m('b')]
      }

      expect(deps.build(rules)).to.deep.equal({
        a: ['b', 'c', 'd'],
        d: ['c'],
        c: ['b']
      })
    })
  })

  describe('order', function () {
    it('array of fields in order that they should be validated', function () {
      const rules = {
        a: [m('b'), m('c'), m('d')],
        b: [m()],
        d: [m('c')],
        c: [m('b')]
      }

      expect(deps.order(rules)).to.deep.equal([
        'b', 'c', 'd', 'a'
      ])
    })
  })

  function m (dependsOn) {
    return { name: 'True', dependsOn, validate }

    function validate () {
      return true
    }
  }
})
