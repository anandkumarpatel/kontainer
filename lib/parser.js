'use strict'
const fs = require('fs')
const path = require('path')

const Deployment = require('./deployment.js')
const log = require('./logger.js')

module.exports = class Parser {
  constructor (inspectData, opts) {
    opts = opts || {}

    this.inspectData = inspectData
    this.name = this._getName(inspectData, opts)
    this.ports = inspectData.Config.ExposedPorts
    this.envs = inspectData.Config.Env
    this.image = inspectData.Config.Image
    this.command = inspectData.Config.Entrypoint
    this.args = inspectData.Config.Cmd
    this.removeMounts = opts.removeMounts
    this.rootPath = opts.rootPath
    this.boundMounts = this._getBoundMounts(inspectData.Mounts)
    log.trace('Parser:constructor', { info: this })
  }

  _getName (inspectData, opts) {
    log.trace('_getName', { inspectData, opts })
    let out = inspectData.Name.substr(1)
    if (opts.useImageAsName) {
      out = inspectData.Config.Image
    }

    return out.replace(/[\W_]+/g, '-')
  }
  /**
   * @return {Object} k8 configuration objects
   */
  getJsonConfigs () {
    log.trace('getJsonConfigs')
    let out = {}

    if (this._isMountsBound()) {
      this._addMounts(out)
    }

    if (this.ports) {
      this._addService(out)
    }

    this._addDeployments(out)

    return out
  }

  _addDeployments (out) {
    log.trace('_addDeployments', { out })
    const deployment = new Deployment(this.inspectData, this.name, this.boundMounts)
    out.deployments = deployment.getJsonDeployment()
  }

  _isMountsBound () {
    log.trace('_isMountsBound')
    return !!this.boundMounts.length
  }

  _getBoundMounts (mounts) {
    log.trace('_getBoundMounts', { mounts })
    return mounts
      .filter(this._isMountBinded)
      .filter(this._applyUserFilter.bind(this))
      .map(this._applyRootPath.bind(this))
  }

  _applyUserFilter (mount) {
    log.trace('_applyUserFilter', { mount })
    if (!this.removeMounts) { return true }

    const filter = new RegExp(this.removeMounts)
    return !filter.test(mount.Source)
  }

  _applyRootPath (mount) {
    log.trace('_applyRootPath', { mount })
    if (this.rootPath) {
      mount.Source = path.join(this.rootPath, mount.Source)
    }
    return mount
  }

  _getMountName (mount) {
    log.trace('_getMountName', { mount })
    return `${this.name}${mount.Destination}`.replace(/\//g, '-').replace(/\./g, '-')
  }

  _isMountBinded (mount) {
    log.trace('_isMountBinded', { mount })
    return mount.Driver !== 'local'
  }

  _addMounts (out) {
    log.trace('_addMounts', { out })
    out.configMaps = {}
    const boundMounts = this.boundMounts

    boundMounts.forEach(this._addConfigMounts.bind(this, out))
  }

  _addConfigMounts (out, mount) {
    const mountName = this._getMountName(mount)
    log.trace('_addConfigMounts', { mount })

    out.configMaps[mountName] = {
      'apiVersion': 'v1',
      'kind': 'ConfigMap',
      'metadata': {
        'name': mountName
      },
      'data': {}
    }

    this._addConfigMountsToOutput(out, mount, mountName)
  }

  _addConfigMountsToOutput (out, mount, mountName) {
    log.trace('_addConfigMountsToOutput', { out, mount, mountName })
    const isFolder = fs.lstatSync(mount.Source).isDirectory()
    if (isFolder) {
      fs.readdirSync(mount.Source).map((file) => {
        const filepath = path.join(mount.Source, file)
        out.configMaps[mountName].data[file] = fs.readFileSync(filepath).toString()
      })
    } else {
      const file = path.basename(mount.Destination)
      out.configMaps[mountName].data[file] = fs.readFileSync(mount.Source).toString()
    }
  }
  
  _addService (out) {
    log.trace('_addService', { out })
    const name = this.name
    const ports = this.ports

    out.services = {}
    out.services[name] = {
      'apiVersion': 'v1',
      'kind': 'Service',
      'metadata': {
        name
      },
      'spec': {
        'selector': {
          'app': name
        },
        'type': 'LoadBalancer'
      }
    }

    out.services[name].spec.ports = Object.keys(ports).map((portAndProtocol) => {
      const split = portAndProtocol.split('/')
      const port = parseInt(split[0], 10)
      const protocol = split[1].toUpperCase()

      return {
        port,
        protocol,
        name: `${port}`
      }
    })
  }
}
