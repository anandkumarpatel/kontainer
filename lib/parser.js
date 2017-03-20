'use strict'
const fs = require('fs')
const path = require('path')

const Deployment = require('./deployment.js')

module.exports = class Parser {
  constructor (inspectData, opts) {
    opts = opts || {}

    this.inspectData = inspectData
    this.name = inspectData.Name.substr(1).replace(/_/g, '-')
    this.ports = inspectData.Config.ExposedPorts
    this.envs = inspectData.Config.Env
    this.image = inspectData.Config.Image
    this.command = inspectData.Config.Entrypoint
    this.args = inspectData.Config.Cmd
    this.removeMounts = opts.removeMounts
    this.boundMounts = this._getBoundMounts(inspectData.Mounts)
  }

  /**
   * @return {Object} k8 configuration objects
   */
  getJsonConfigs () {
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
    const deployment = new Deployment(this.inspectData, this.name, this.boundMounts)
    out.deployments = deployment.getJsonDeployment()
  }

  _isMountsBound () {
    return !!this.boundMounts.length
  }

  _getBoundMounts (mounts) {
    return mounts
      .filter(this._isMountBinded)
      .filter(this._applyUserFilter.bind(this))
  }

  _applyUserFilter (mount) {
    if (!this.removeMounts) { return true }

    const filter = new RegExp(this.removeMounts)
    return !filter.test(mount.Source)
  }

  _getMountName (mount) {
    return `${this.name}${mount.Destination}`.replace(/\//g, '-').replace(/\./g, '-')
  }

  _isMountBinded (mount) {
    return mount.Type === 'bind' || mount.Propagation === 'rprivate'
  }

  _addMounts (out) {
    out.configMaps = {}
    const boundMounts = this.boundMounts

    boundMounts.forEach((mount) => {
      const mountName = this._getMountName(mount)
      const isFolder = fs.lstatSync(mount.Source).isDirectory()

      out.configMaps[mountName] = {
        'apiVersion': 'v1',
        'kind': 'ConfigMap',
        'metadata': {
          'name': mountName
        },
        'data': {}
      }

      if (isFolder) {
        fs.readdirSync(mount.Source).map((file) => {
          const filepath = path.join(mount.Source, file)
          out.configMaps[mountName].data[file] = fs.readFileSync(filepath).toString()
        })
      } else {
        const file = path.basename(mount.Destination)
        out.configMaps[mountName].data[file] = fs.readFileSync(mount.Source).toString()
      }
    })
  }

  _addService (out) {
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
