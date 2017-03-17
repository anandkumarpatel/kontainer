'use strict'
const Docker = require('dockerode')
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const parser = require('parser')

class ConfigCreator {
  fromContainer (containerId, outPath) {
    const docker = new Docker()

    return docker.getContainer(containerId)
    .inspect()
    .then((inspectData) => {
      return parser.parse(inspectData)
    })
    .then((jsonConfigs) => {
      Object.keys(jsonConfigs).sort().forEach((kind) => {
        fs.mkdirSync(path.join(outPath, kind))

        Object.keys(jsonConfigs[kind]).forEach((kindName) => {
          fs.writeFileSync(path.join(outPath, kind, kindName), yaml.safeDump(jsonConfigs[kind][kindName]))
        })
      })
    })
  }
}

module.exports = new ConfigCreator()
