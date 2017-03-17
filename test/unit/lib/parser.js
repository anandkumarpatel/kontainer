'use strict'
const Code = require('code')
const Lab = require('lab')

const lab = exports.lab = Lab.script()
const parser = require('parser.js')
const samples = require('../../fixtures/samples.js')

const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('parser.js unit test', () => {
  describe('generateConfig', () => {
    it('should return kubernetes config from docker inspect with ports', (done) => {
      const out = parser.parse(samples.inspectExternalPorts)
      expect(out).to.equal(samples.configExternalPorts)
      done()
    })

    it('should return kubernetes config from docker inspect with mounts', (done) => {
      const out = parser.parse(samples.inspectMounts)
      expect(out).to.equal(samples.configMounts)
      done()
    })
  }) // end generateConfig
})
