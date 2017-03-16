'use strict'
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

class Parser {
  parse (input) {
    let out = {}
    const name = input.Name.substr(1).replace(/_/g, '-')
    const ports = input.Config.ExposedPorts
    const envs = input.Config.Env
    const image = input.Config.Image
    const command = input.Config.Entrypoint
    const args = input.Config.Cmd
    const mounts = input.Mounts

    if (this._hasBinds(mounts)) {
      this._addMounts(out, name, mounts)
    }

    this._addDeployments(out, name, ports, envs, image, command, args, mounts)

    return out
  }

  _addDeployments (out, name, ports, envs, image, command, args, mounts) {
    out.deployments = {}
    out.deployments[name] = {
      'apiVersion': 'extensions/v1beta1',
      'kind': 'Deployment',
      'metadata': {
        name
      },
      'spec': {
        'replicas': 1,
        'template': {
          'metadata': {
            'labels': {
              'app': name
            }
          },
          'spec': {
            'containers': [{
              image,
              name,
              'env': envs.map((env) => {
                const split = env.split('=')
                const name = split[0]
                const value = split[1]
                return {
                  name,
                  value
                }
              })
            }]
          }
        }
      }
    }

    if (this._hasBinds(mounts)) {
      out.deployments[name].spec.template.spec.volumes = mounts.map((mount) => {
        const mountName = this._getMountName(name, mount)

        return {
          name: mountName,
          configMap: {
            name: mountName
          }
        }
      })

      out.deployments[name].spec.template.spec.containers[0].volumeMounts = mounts.map((mount) => {
        const mountName = this._getMountName(name, mount)
        const isFile = fs.lstatSync(mount.Source).isFile()
        let mountPath = mount.Destination
        if (isFile) {
          mountPath = path.dirname(mountPath)
        }
        return {
          name: mountName,
          mountPath
        }
      })
    }

    if (command) {
      out.deployments[name].spec.template.spec.containers[0].command = command
    }

    if (args) {
      out.deployments[name].spec.template.spec.containers[0].args = args
    }

    if (ports) {
      out.deployments[name].spec.template.spec.containers[0].ports = Object.keys(ports).map((portAndProtocol) => {
        const containerPort = parseInt(portAndProtocol.split('/')[0], 10)
        return {
          containerPort
        }
      })

      this._addService(out, name, ports)
    }
  }

  _getMountName (name, mount) {
    return `${name}${mount.Destination}`.replace(/\//g, '-').replace(/\./g, '-')
  }

  _hasBinds (mounts) {
    return mounts.some((mount) => { return mount.Type === 'bind' })
  }

  _addMounts (out, name, mounts) {
    out.configMaps = {}

    mounts.forEach((mount) => {
      const mountName = this._getMountName(name, mount)
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

  _addService (out, name, ports) {
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

    if (ports) {
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

  _formatJsonConfigToYaml (jsonConfigs) {
    const ymalConfig = []
    Object.keys(jsonConfigs).sort().forEach((kind) => {
      Object.keys(jsonConfigs[kind]).forEach((kindName) => {
        ymalConfig.push(yaml.safeDump(jsonConfigs[kind][kindName]))
      })
    })

    return ymalConfig.join('---\n')
  }
}

module.exports = new Parser()
