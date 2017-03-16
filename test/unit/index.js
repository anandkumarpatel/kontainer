'use strict'
const Code = require('code')
const Lab = require('lab')
// const sinon = require('sinon')

const lab = exports.lab = Lab.script()
const parser = require('parser.js')
const samples = require('../fixtures/samples.js')
const fs = require('fs')

// const after = lab.after
// const afterEach = lab.afterEach
// const before = lab.before
// const beforeEach = lab.beforeEach
const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('index.js unit test', () => {
  describe('generateConfig', () => {
    it('should return kubernetes config from docker inspect with ports', (done) => {
      const out = parser.parse(samples.inspectExternalPorts)
      expect(out).to.equal(samples.configExternalPorts)
      done()
    })

    it('should return kubernetes config from docker inspect with mounts', (done) => {
      const out = parser.parse(samples.inspectMounts)
      expect(out).to.equal(samples.configMounts)
      const yml = parser._formatJsonConfigToYaml(out)
      fs.writeFileSync('./myconf', yml)
      done()
    })
  }) // end generateConfig
})
