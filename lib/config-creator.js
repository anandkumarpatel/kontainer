'use strict'
const Docker = require('dockerode')
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const Parser = require('./parser.js')

class ConfigCreator {
  fromContainer (containerId, outPath, opts) {
    const docker = new Docker()

    return docker.getContainer(containerId)
    .inspect()
    .then((inspectData) => {
      return this.fromInspect(inspectData, outPath, opts)
    })
  }

  fromInspect (inspect, outPath, opts) {
    const parser = new Parser(inspect, opts)
    const jsonConfigs = parser.getJsonConfigs()

    Object.keys(jsonConfigs).forEach((kind) => {
      try {
        fs.mkdirSync(path.join(outPath, kind))
      } catch (err) {
        if (!err.message.code === 'EEXIST') {
          throw err
        }
      }

      Object.keys(jsonConfigs[kind]).forEach((kindName) => {
        fs.writeFileSync(path.join(outPath, kind, kindName), yaml.safeDump(jsonConfigs[kind][kindName]))
      })
    })
  }
}

module.exports = new ConfigCreator()
