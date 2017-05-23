'use strict'
const Docker = require('dockerode')
const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')
const yaml = require('js-yaml')

const Parser = require('./parser.js')
const log = require('./logger.js')

class ConfigCreator {
  constructor () {
    this.docker = new Docker({ Promise })
  }

  fromContainers (outPath, opts) {
    log.trace('fromContainers', { outPath, opts })

    return this.docker.listContainers()
    .each((containerInfo) => {
      // skip kontainer
      if (containerInfo.Image.includes('anandkumarpatel/kontainer')) {
        return
      }
      return this.fromContainer(containerInfo.Id, outPath, opts)
    })
  }

  fromContainer (containerId, outPath, opts) {
    log.trace('fromContainer', { containerId, outPath, opts })

    return this.docker.getContainer(containerId)
    .inspect()
    .then((inspectData) => {
      return this.fromInspect(inspectData, outPath, opts)
    })
  }

  fromInspect (inspectData, outPath, opts) {
    log.trace('fromInspect', {inspectData, outPath, opts})

    const parser = new Parser(inspectData, opts)
    const jsonConfigs = parser.getJsonConfigs()

    this._writeToDisk(outPath, jsonConfigs)
  }

  _writeToDisk (outPath, jsonConfigs) {
    log.warn('_writeToDisk', {outPath, jsonConfigs})

    Object.keys(jsonConfigs).forEach((kind) => {
      try {
        fs.mkdirSync(path.join(outPath, kind))
      } catch (err) {
        if (!err.message.code === 'EEXIST') {
          log.warn('_writeToDisk: err', { err })
          throw err
        }
        log.warn('_writeToDisk: resource folder exists', { outPath, kind })
      }

      Object.keys(jsonConfigs[kind]).forEach((kindName) => {
        fs.writeFileSync(path.join(outPath, kind, kindName), yaml.safeDump(jsonConfigs[kind][kindName]))
      })
    })
  }
}

module.exports = new ConfigCreator()
