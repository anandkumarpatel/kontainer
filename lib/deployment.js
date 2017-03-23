'use strict'
const fs = require('fs')
const path = require('path')

const log = require('./logger.js')

module.exports = class Deployment {
  constructor (inspectData, name, boundMounts) {
    this.inspectData = inspectData
    this.name = name
    this.ports = inspectData.Config.ExposedPorts
    this.envs = inspectData.Config.Env
    this.image = inspectData.Config.Image
    this.command = inspectData.Config.Entrypoint
    this.args = inspectData.Config.Cmd
    this.boundMounts = boundMounts
    log.trace('Deployment:constructor', { info: this })
  }

  getJsonDeployment () {
    log.trace('getJsonDeployment')

    const out = {}
    const jsonConfig = this._createRootConfig()

    this._addVolumesToSpecIfNeeded(jsonConfig.spec.template.spec)
    this._addCommandIfNeeded(jsonConfig.spec.template.spec)
    this._addPortsIfNeeded(jsonConfig.spec.template.spec)

    out[this.name] = jsonConfig
    return out
  }

  _addVolumesToSpecIfNeeded (spec) {
    log.trace('_addVolumesToSpecIfNeeded', { spec })
    if (this._isMountsBound()) {
      spec.volumes = this._getVolumesConfig()
      spec.containers[0].volumeMounts = this._getVolumesMountConfig()
    }
  }

  _addCommandIfNeeded (spec) {
    const command = this.command
    log.trace('_addCommandIfNeeded', { command })
    if (command) {
      spec.containers[0].command = command
    }
  }

  _addPortsIfNeeded (spec) {
    const ports = this.ports
    log.trace('_addPortsIfNeeded', { ports })
    if (ports) {
      spec.containers[0].ports = this._getPorts()
    }
  }

  _getPorts () {
    const ports = this.ports
    log.trace('_getPorts', { ports })
    return Object
      .keys(ports)
      .map(this._getContainerPort)
  }

  _getContainerPort (portAndProtocol) {
    log.trace('_parseEnv', { portAndProtocol })
    return {
      containerPort: parseInt(portAndProtocol.split('/')[0], 10)
    }
  }

  _getVolumesConfig () {
    log.trace('_getVolumesConfig')
    return this.boundMounts.map(this._getVolumeConfig.bind(this))
  }

  _getVolumeConfig (mount) {
    log.trace('_getVolumeConfig', { mount })
    const mountName = this._getMountName(mount)

    return {
      name: mountName,
      configMap: {
        name: mountName
      }
    }
  }

  _getVolumesMountConfig () {
    log.trace('_getVolumesMountConfig')
    return this.boundMounts.map(this._getVolumeMountConfig.bind(this))
  }

  _getVolumeMountConfig (mount) {
    log.trace('_getVolumeMountConfig', { mount })
    let mountPath = mount.Destination
    const mountName = this._getMountName(mount)
    const isFile = fs.lstatSync(mount.Source).isFile()

    if (isFile) {
      mountPath = path.dirname(mountPath)
    }
    return {
      name: mountName,
      mountPath
    }
  }

  _createRootConfig () {
    const name = this.name
    const image = this.image
    const args = this.args
    log.trace('_createRootConfig', { name, image, args })

    return {
      apiVersion: 'extensions/v1beta1',
      kind: 'Deployment',
      metadata: {
        name
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: name
            }
          },
          spec: {
            containers: [{
              image,
              name,
              args,
              env: this._getEnvs()
            }]
          }
        }
      }
    }
  }

  _getEnvs () {
    log.trace('_getEnvs')
    return this.envs.map(this._parseEnv)
  }

  _parseEnv (env) {
    log.trace('_parseEnv', { env })
    const split = env.split('=')
    const name = split[0]
    const value = split[1]
    return {
      name,
      value
    }
  }

  // TODO merge with other
  _isMountsBound () {
    log.trace('_isMountsBound')
    return !!this.boundMounts.length
  }
  // TODO merge with other
  _getMountName (mount) {
    log.trace('_parseEnv', { mount })
    return `${this.name}${mount.Destination}`.replace(/[\W_]+/g, '-').toLowerCase()
  }
}
