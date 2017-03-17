'use strict'
const Code = require('code')
const Lab = require('lab')
const sinon = require('sinon')
const docker = require('dockerode')
const path = require('path')
const rimraf = require('rimraf')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()
const configCreator = require('config-creator.js')
const samples = require('../../fixtures/samples.js')
const fs = require('fs')

const afterEach = lab.afterEach
const beforeEach = lab.beforeEach
const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('config-creator.js unit test', () => {
  const outpath = path.join(__dirname, '../../artifacts')

  describe('fromContainer', () => {
    let inspectStub
    beforeEach((done) => {
      inspectStub = sinon.stub()
      sinon.stub(docker.prototype, 'getContainer').returns({
        inspect: inspectStub
      })
      rimraf.sync(outpath)
      fs.mkdirSync(outpath)
      done()
    })

    afterEach((done) => {
      // rimraf.sync(outpath)
      docker.prototype.getContainer.restore()
      done()
    })

    it('should write configs out to files for mounts', () => {
      const testId = '123123'

      inspectStub.resolves(samples.inspectMounts)

      return configCreator.fromContainer(testId, outpath)
      .then(() => {
        const ymlMountsDeploymentsAgitatedKhorana = fs.readFileSync(path.join(outpath, '/deployments/agitated-khorana')).toString()
        const ymlMountsConfigMapsAgitatedKhoranaVolume = fs.readFileSync(path.join(outpath, '/configMaps/agitated-khorana-volume')).toString()
        const ymlMountsConfigMapsAgitatedKhoranaHomeStuff = fs.readFileSync(path.join(outpath, '/configMaps/agitated-khorana-home-stuff')).toString()
        const ymlMountsConfigMapsAgitatedKhoranaHomeLongConfig = fs.readFileSync(path.join(outpath, '/configMaps/agitated-khorana-home-long-config')).toString()

        expect(ymlMountsDeploymentsAgitatedKhorana).to.equal(samples.ymlMountsDeploymentsAgitatedKhorana)
        expect(ymlMountsConfigMapsAgitatedKhoranaVolume).to.equal(samples.ymlMountsConfigMapsAgitatedKhoranaVolume)
        expect(ymlMountsConfigMapsAgitatedKhoranaHomeStuff).to.equal(samples.ymlMountsConfigMapsAgitatedKhoranaHomeStuff)
        expect(ymlMountsConfigMapsAgitatedKhoranaHomeLongConfig).to.equal(samples.ymlMountsConfigMapsAgitatedKhoranaHomeLongConfig)
      })
    })

    it('should write configs out to files for ports', () => {
      const testId = '123123'

      inspectStub.resolves(samples.inspectExternalPorts)

      return configCreator.fromContainer(testId, outpath)
      .then(() => {
        const ymlExternalPortsDeploymentsRabbit = fs.readFileSync(path.join(outpath, '/deployments/rabbit')).toString()
        const ymlExternalPortsServicesRabbit = fs.readFileSync(path.join(outpath, '/services/rabbit')).toString()

        expect(ymlExternalPortsDeploymentsRabbit).to.equal(samples.ymlExternalPortsDeploymentsRabbit)
        expect(ymlExternalPortsServicesRabbit).to.equal(samples.ymlExternalPortsServicesRabbit)
      })
    })
  }) // end fromContainer
})
