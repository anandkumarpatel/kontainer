'use strict'
const Code = require('code')
const Lab = require('lab')

const lab = exports.lab = Lab.script()
const Parser = require('../../../lib/parser.js')
const samples = require('../../fixtures/samples.js')

const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('parser.js unit test', () => {
  describe('generateConfig', () => {
    it('should return kubernetes config from docker inspect with ports', (done) => {
      const parser = new Parser(samples.inspectExternalPorts)
      const out = parser.getJsonConfigs()
      expect(out).to.equal(samples.configExternalPorts)
      done()
    })

    it('should return kubernetes config from docker inspect with mounts and ignore', (done) => {
      const parser = new Parser(samples.inspectMounts, {
        removeMounts: 'logs'
      })
      const out = parser.getJsonConfigs()
      expect(out).to.equal(samples.configMounts)
      done()
    })
  }) // end generateConfig
})
