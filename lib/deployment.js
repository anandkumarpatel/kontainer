'use strict'
const fs = require('fs')
const path = require('path')

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
  }

  getJsonDeployment () {
    let out = {}
    const name = this.name
    const jsonConfig = this._createRootConfig()

    this._addVolumesIfNeeded(jsonConfig)
    this._addCommandIfNeeded(jsonConfig)
    this._addPortsIfNeeded(jsonConfig)

    out[name] = jsonConfig
    return out
  }

  _addVolumesIfNeeded (jsonConfig) {
    if (this._isMountsBound()) {
      jsonConfig.spec.template.spec.volumes = this._getVolumesConfig()
      jsonConfig.spec.template.spec.containers[0].volumeMounts = this._getVolumesMountConfig()
    }
  }

  _addCommandIfNeeded (jsonConfig) {
    if (this.command) {
      jsonConfig.spec.template.spec.containers[0].command = this.command
    }
  }

  _addPortsIfNeeded (jsonConfig) {
    if (this.ports) {
      jsonConfig.spec.template.spec.containers[0].ports = this._getPorts()
    }
  }

  _getVolumesConfig () {
    return this.boundMounts.map(this._getVolumeConfig.bind(this))
  }

  _getVolumeConfig (mount) {
    const mountName = this._getMountName(mount)

    return {
      name: mountName,
      configMap: {
        name: mountName
      }
    }
  }

  _getVolumesMountConfig () {
    const boundMounts = this.boundMounts

    return boundMounts.map(this._getVolumeMountConfig.bind(this))
  }

  _getVolumeMountConfig (mount) {
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
    return this.envs.map(this._parseEnv)
  }

  _parseEnv (env) {
    const split = env.split('=')
    const name = split[0]
    const value = split[1]
    return {
      name,
      value
    }
  }

  _getPorts () {
    return Object
      .keys(this.ports)
      .map(this._getContainerPort)
  }

  _getContainerPort (portAndProtocol) {
    return {
      containerPort: parseInt(portAndProtocol.split('/')[0], 10)
    }
  }

  // TODO merge with other
  _isMountsBound () {
    return !!this.boundMounts.length
  }
  // TODO merge with other
  _getMountName (mount) {
    return `${this.name}${mount.Destination}`.replace(/\//g, '-').replace(/\./g, '-')
  }
}
