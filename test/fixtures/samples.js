const fs = require('fs')
const path = require('path')

const fixturesPath = __dirname

module.exports.inspectExternalPorts = {
  'Id': '84f054d8eaeea40c30ad430e1122f70e346a83cd0344f1630fc2e9a3438ffb2f',
  'Created': '2017-03-16T06:35:46.018988914Z',
  'Path': 'docker-entrypoint.sh',
  'Args': [
    'rabbitmq-server'
  ],
  'State': {
    'Status': 'running',
    'Running': true,
    'Paused': false,
    'Restarting': false,
    'OOMKilled': false,
    'Dead': false,
    'Pid': 3259,
    'ExitCode': 0,
    'Error': '',
    'StartedAt': '2017-03-16T06:35:47.731382666Z',
    'FinishedAt': '0001-01-01T00:00:00Z'
  },
  'Image': 'sha256:cb479f313c9370583e6e5e40128f9b0a02dc77e7d61cad0236bbbee0a6a44e53',
  'ResolvConfPath': '/var/lib/docker/containers/84f054d8eaeea40c30ad430e1122f70e346a83cd0344f1630fc2e9a3438ffb2f/resolv.conf',
  'HostnamePath': '/var/lib/docker/containers/84f054d8eaeea40c30ad430e1122f70e346a83cd0344f1630fc2e9a3438ffb2f/hostname',
  'HostsPath': '/var/lib/docker/containers/84f054d8eaeea40c30ad430e1122f70e346a83cd0344f1630fc2e9a3438ffb2f/hosts',
  'LogPath': '/var/lib/docker/containers/84f054d8eaeea40c30ad430e1122f70e346a83cd0344f1630fc2e9a3438ffb2f/84f054d8eaeea40c30ad430e1122f70e346a83cd0344f1630fc2e9a3438ffb2f-json.log',
  'Name': '/rabbit',
  'RestartCount': 0,
  'Driver': 'aufs',
  'MountLabel': '',
  'ProcessLabel': '',
  'AppArmorProfile': '',
  'ExecIDs': null,
  'HostConfig': {
    'Binds': null,
    'ContainerIDFile': '',
    'LogConfig': {
      'Type': 'json-file',
      'Config': {}
    },
    'NetworkMode': 'default',
    'PortBindings': {
      '15672/tcp': [{
        'HostIp': '',
        'HostPort': '15672'
      }],
      '5672/tcp': [{
        'HostIp': '',
        'HostPort': '5672'
      }]
    },
    'RestartPolicy': {
      'Name': 'no',
      'MaximumRetryCount': 0
    },
    'AutoRemove': false,
    'VolumeDriver': '',
    'VolumesFrom': null,
    'CapAdd': null,
    'CapDrop': null,
    'Dns': [],
    'DnsOptions': [],
    'DnsSearch': [],
    'ExtraHosts': null,
    'GroupAdd': null,
    'IpcMode': '',
    'Cgroup': '',
    'Links': null,
    'OomScoreAdj': 0,
    'PidMode': '',
    'Privileged': false,
    'PublishAllPorts': false,
    'ReadonlyRootfs': false,
    'SecurityOpt': null,
    'UTSMode': '',
    'UsernsMode': '',
    'ShmSize': 67108864,
    'Runtime': 'runc',
    'ConsoleSize': [
      0,
      0
    ],
    'Isolation': '',
    'CpuShares': 0,
    'Memory': 0,
    'NanoCpus': 0,
    'CgroupParent': '',
    'BlkioWeight': 0,
    'BlkioWeightDevice': null,
    'BlkioDeviceReadBps': null,
    'BlkioDeviceWriteBps': null,
    'BlkioDeviceReadIOps': null,
    'BlkioDeviceWriteIOps': null,
    'CpuPeriod': 0,
    'CpuQuota': 0,
    'CpuRealtimePeriod': 0,
    'CpuRealtimeRuntime': 0,
    'CpusetCpus': '',
    'CpusetMems': '',
    'Devices': [],
    'DiskQuota': 0,
    'KernelMemory': 0,
    'MemoryReservation': 0,
    'MemorySwap': 0,
    'MemorySwappiness': -1,
    'OomKillDisable': false,
    'PidsLimit': 0,
    'Ulimits': null,
    'CpuCount': 0,
    'CpuPercent': 0,
    'IOMaximumIOps': 0,
    'IOMaximumBandwidth': 0
  },
  'GraphDriver': {
    'Name': 'aufs',
    'Data': null
  },
  'Mounts': [{
    'Type': 'volume',
    'Name': '98541e9be6e3bd2cd9da6731813ef931eabcaf6f0f4f9d6790d0c8c11ad1646f',
    'Source': '/var/lib/docker/volumes/98541e9be6e3bd2cd9da6731813ef931eabcaf6f0f4f9d6790d0c8c11ad1646f/_data',
    'Destination': '/var/lib/rabbitmq',
    'Driver': 'local',
    'Mode': '',
    'RW': true,
    'Propagation': ''
  }],
  'Config': {
    'Hostname': '84f054d8eaee',
    'Domainname': '',
    'User': '',
    'AttachStdin': false,
    'AttachStdout': false,
    'AttachStderr': false,
    'ExposedPorts': {
      '15671/tcp': {},
      '15672/tcp': {},
      '25672/tcp': {},
      '4369/tcp': {},
      '5671/tcp': {},
      '5672/tcp': {}
    },
    'Tty': false,
    'OpenStdin': false,
    'StdinOnce': false,
    'Env': [
      'no_proxy=*.local, 169.254/16',
      'PATH=/usr/lib/rabbitmq/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
      'GOSU_VERSION=1.7',
      'RABBITMQ_LOGS=-',
      'RABBITMQ_SASL_LOGS=-',
      'RABBITMQ_VERSION=3.6.5',
      'RABBITMQ_DEBIAN_VERSION=3.6.5-1',
      'HOME=/var/lib/rabbitmq'
    ],
    'Cmd': [
      'rabbitmq-server'
    ],
    'ArgsEscaped': true,
    'Image': 'rabbitmq:3-management',
    'Volumes': {
      '/var/lib/rabbitmq': {}
    },
    'WorkingDir': '',
    'Entrypoint': [
      'docker-entrypoint.sh'
    ],
    'OnBuild': null,
    'Labels': {}
  },
  'NetworkSettings': {
    'Bridge': '',
    'SandboxID': '79165d672b8c172861dc6c559d8bf5b1c2fcb10d36f8d1a8f0a6c3374d2a1fae',
    'HairpinMode': false,
    'LinkLocalIPv6Address': '',
    'LinkLocalIPv6PrefixLen': 0,
    'Ports': {
      '15671/tcp': null,
      '15672/tcp': [{
        'HostIp': '0.0.0.0',
        'HostPort': '15672'
      }],
      '25672/tcp': null,
      '4369/tcp': null,
      '5671/tcp': null,
      '5672/tcp': [{
        'HostIp': '0.0.0.0',
        'HostPort': '5672'
      }]
    },
    'SandboxKey': '/var/run/docker/netns/79165d672b8c',
    'SecondaryIPAddresses': null,
    'SecondaryIPv6Addresses': null,
    'EndpointID': 'e3397e596d49425f72639d8dabe825e2e4fe42f020d870dacc6922547433e659',
    'Gateway': '172.17.0.1',
    'GlobalIPv6Address': '',
    'GlobalIPv6PrefixLen': 0,
    'IPAddress': '172.17.0.5',
    'IPPrefixLen': 16,
    'IPv6Gateway': '',
    'MacAddress': '02:42:ac:11:00:05',
    'Networks': {
      'bridge': {
        'IPAMConfig': null,
        'Links': null,
        'Aliases': null,
        'NetworkID': 'ffc96def1841f3f158d6ea0d8a58f6b54c22b953951c8773d3dd8e4ea871b7df',
        'EndpointID': 'e3397e596d49425f72639d8dabe825e2e4fe42f020d870dacc6922547433e659',
        'Gateway': '172.17.0.1',
        'IPAddress': '172.17.0.5',
        'IPPrefixLen': 16,
        'IPv6Gateway': '',
        'GlobalIPv6Address': '',
        'GlobalIPv6PrefixLen': 0,
        'MacAddress': '02:42:ac:11:00:05'
      }
    }
  }
}

module.exports.configExternalPorts = {
  deployments: {
    rabbit: {
      'apiVersion': 'extensions/v1beta1',
      'kind': 'Deployment',
      'metadata': {
        'name': 'rabbit'
      },
      'spec': {
        'replicas': 1,
        'template': {
          'metadata': {
            'labels': {
              'app': 'rabbit'
            }
          },
          'spec': {
            'containers': [{
              'image': 'rabbitmq:3-management',
              'name': 'rabbit',
              'command': ['docker-entrypoint.sh'],
              'args': ['rabbitmq-server'],
              'ports': [{
                'containerPort': 15671
              }, {
                'containerPort': 15672
              }, {
                'containerPort': 25672
              }, {
                'containerPort': 4369
              }, {
                'containerPort': 5671
              }, {
                'containerPort': 5672
              }],
              'env': [{
                'name': 'no_proxy',
                'value': '*.local, 169.254/16'
              }, {
                'name': 'PATH',
                'value': '/usr/lib/rabbitmq/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
              }, {
                'name': 'GOSU_VERSION',
                'value': '1.7'
              }, {
                'name': 'RABBITMQ_LOGS',
                'value': '-'
              }, {
                'name': 'RABBITMQ_SASL_LOGS',
                'value': '-'
              }, {
                'name': 'RABBITMQ_VERSION',
                'value': '3.6.5'
              }, {
                'name': 'RABBITMQ_DEBIAN_VERSION',
                'value': '3.6.5-1'
              }, {
                'name': 'HOME',
                'value': '/var/lib/rabbitmq'
              }]
            }]
          }
        }
      }
    }
  },
  services: {
    'rabbit': {
      'apiVersion': 'v1',
      'kind': 'Service',
      'metadata': {
        'name': 'rabbit'
      },
      'spec': {
        'ports': [{
          'port': 15671,
          'name': '15671',
          'protocol': 'TCP'
        }, {
          'port': 15672,
          'name': '15672',
          'protocol': 'TCP'
        }, {
          'port': 25672,
          'name': '25672',
          'protocol': 'TCP'
        }, {
          'port': 4369,
          'name': '4369',
          'protocol': 'TCP'
        }, {
          'port': 5671,
          'name': '5671',
          'protocol': 'TCP'
        }, {
          'port': 5672,
          'name': '5672',
          'protocol': 'TCP'
        }],
        'selector': {
          'app': 'rabbit'
        },
        'type': 'LoadBalancer'
      }
    }
  }
}

module.exports.ymlExternalPortsDeploymentsRabbit = fs.readFileSync(path.join(fixturesPath, 'k8-configs-external-ports/deployments/rabbit')).toString()
module.exports.ymlExternalPortsServicesRabbit = fs.readFileSync(path.join(fixturesPath, 'k8-configs-external-ports/services/rabbit')).toString()

module.exports.inspectMounts = {
  'AppArmorProfile': '',
  'Args': [
    '10000'
  ],
  'Config': {
    'AttachStderr': false,
    'AttachStdin': false,
    'AttachStdout': false,
    'Cmd': [
      'sleep',
      '10000'
    ],
    'Domainname': '',
    'Entrypoint': null,
    'Env': [
      'no_proxy=*.local, 169.254/16',
      'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
    ],
    'Hostname': '4ee2974076f7',
    'Image': 'busybox',
    'Labels': {},
    'OnBuild': null,
    'OpenStdin': false,
    'StdinOnce': false,
    'Tty': false,
    'User': '',
    'Volumes': null,
    'WorkingDir': ''
  },
  'Created': '2017-03-16T21:22:26.998612642Z',
  'Driver': 'aufs',
  'ExecIDs': null,
  'GraphDriver': {
    'Data': null,
    'Name': 'aufs'
  },
  'HostConfig': {
    'AutoRemove': false,
    'Binds': [
      `${fixturesPath}/mounts/file.txt:/home/long/config`,
      `${fixturesPath}/mounts/volume:/volume`,
      `${fixturesPath}/mounts/volume:/home/stuff`
    ],
    'BlkioDeviceReadBps': null,
    'BlkioDeviceReadIOps': null,
    'BlkioDeviceWriteBps': null,
    'BlkioDeviceWriteIOps': null,
    'BlkioWeight': 0,
    'BlkioWeightDevice': null,
    'CapAdd': null,
    'CapDrop': null,
    'Cgroup': '',
    'CgroupParent': '',
    'ConsoleSize': [
      0,
      0
    ],
    'ContainerIDFile': '',
    'CpuCount': 0,
    'CpuPercent': 0,
    'CpuPeriod': 0,
    'CpuQuota': 0,
    'CpuRealtimePeriod': 0,
    'CpuRealtimeRuntime': 0,
    'CpuShares': 0,
    'CpusetCpus': '',
    'CpusetMems': '',
    'Devices': [],
    'DiskQuota': 0,
    'Dns': [],
    'DnsOptions': [],
    'DnsSearch': [],
    'ExtraHosts': null,
    'GroupAdd': null,
    'IOMaximumBandwidth': 0,
    'IOMaximumIOps': 0,
    'IpcMode': '',
    'Isolation': '',
    'KernelMemory': 0,
    'Links': null,
    'LogConfig': {
      'Config': {},
      'Type': 'json-file'
    },
    'Memory': 0,
    'MemoryReservation': 0,
    'MemorySwap': 0,
    'MemorySwappiness': -1,
    'NanoCpus': 0,
    'NetworkMode': 'default',
    'OomKillDisable': false,
    'OomScoreAdj': 0,
    'PidMode': '',
    'PidsLimit': 0,
    'PortBindings': {},
    'Privileged': false,
    'PublishAllPorts': false,
    'ReadonlyRootfs': false,
    'RestartPolicy': {
      'MaximumRetryCount': 0,
      'Name': 'no'
    },
    'Runtime': 'runc',
    'SecurityOpt': null,
    'ShmSize': 67108864,
    'UTSMode': '',
    'Ulimits': null,
    'UsernsMode': '',
    'VolumeDriver': '',
    'VolumesFrom': null
  },
  'HostnamePath': '/var/lib/docker/containers/4ee2974076f702099b03e53bdce275104c32b7a6ca438a0930fc5da40cc4c217/hostname',
  'HostsPath': '/var/lib/docker/containers/4ee2974076f702099b03e53bdce275104c32b7a6ca438a0930fc5da40cc4c217/hosts',
  'Id': '4ee2974076f702099b03e53bdce275104c32b7a6ca438a0930fc5da40cc4c217',
  'Image': 'sha256:00f017a8c2a6e1fe2ffd05c281f27d069d2a99323a8cd514dd35f228ba26d2ff',
  'LogPath': '/var/lib/docker/containers/4ee2974076f702099b03e53bdce275104c32b7a6ca438a0930fc5da40cc4c217/4ee2974076f702099b03e53bdce275104c32b7a6ca438a0930fc5da40cc4c217-json.log',
  'MountLabel': '',
  'Mounts': [
    {
      'Destination': '/home/stuff',
      'Mode': '',
      'Propagation': '',
      'RW': true,
      'Source': `${fixturesPath}/mounts/volume`,
      'Type': 'bind'
    },
    {
      'Destination': '/home/long/config',
      'Mode': '',
      'Propagation': '',
      'RW': true,
      'Source': `${fixturesPath}/mounts/file.txt`,
      'Type': 'bind'
    },
    {
      'Destination': '/volume',
      'Mode': '',
      'Propagation': '',
      'RW': true,
      'Source': `${fixturesPath}/mounts/volume`,
      'Type': 'bind'
    }
  ],
  'Name': '/agitated_khorana',
  'NetworkSettings': {
    'Bridge': '',
    'EndpointID': '',
    'Gateway': '',
    'GlobalIPv6Address': '',
    'GlobalIPv6PrefixLen': 0,
    'HairpinMode': false,
    'IPAddress': '',
    'IPPrefixLen': 0,
    'IPv6Gateway': '',
    'LinkLocalIPv6Address': '',
    'LinkLocalIPv6PrefixLen': 0,
    'MacAddress': '',
    'Networks': {
      'bridge': {
        'Aliases': null,
        'EndpointID': '',
        'Gateway': '',
        'GlobalIPv6Address': '',
        'GlobalIPv6PrefixLen': 0,
        'IPAMConfig': null,
        'IPAddress': '',
        'IPPrefixLen': 0,
        'IPv6Gateway': '',
        'Links': null,
        'MacAddress': '',
        'NetworkID': 'ffc96def1841f3f158d6ea0d8a58f6b54c22b953951c8773d3dd8e4ea871b7df'
      }
    },
    'Ports': null,
    'SandboxID': 'c4dd77565346e7baf6973fc2b69f5a91f62af4a47be9ec9bc0415dfc016546d2',
    'SandboxKey': '/var/run/docker/netns/c4dd77565346',
    'SecondaryIPAddresses': null,
    'SecondaryIPv6Addresses': null
  },
  'Path': 'sleep',
  'ProcessLabel': '',
  'ResolvConfPath': '/var/lib/docker/containers/4ee2974076f702099b03e53bdce275104c32b7a6ca438a0930fc5da40cc4c217/resolv.conf',
  'RestartCount': 0,
  'State': {
    'Dead': false,
    'Error': '',
    'ExitCode': 0,
    'FinishedAt': '2017-03-16T21:22:27.836876424Z',
    'OOMKilled': false,
    'Paused': false,
    'Pid': 0,
    'Restarting': false,
    'Running': false,
    'StartedAt': '2017-03-16T21:22:27.745931712Z',
    'Status': 'exited'
  }
}

const file1Txt = fs.readFileSync(path.join(fixturesPath, 'mounts/volume/1.txt')).toString()
const fileCaPem = fs.readFileSync(path.join(fixturesPath, 'mounts/volume/ca.pem')).toString()
const fileCat = fs.readFileSync(path.join(fixturesPath, 'mounts/volume/cat')).toString()
const fileFileTxt = fs.readFileSync(path.join(fixturesPath, 'mounts/file.txt')).toString()

module.exports.configMounts = {
  deployments: {
    'agitated-khorana': {
      'apiVersion': 'extensions/v1beta1',
      'kind': 'Deployment',
      'metadata': {
        'name': 'agitated-khorana'
      },
      'spec': {
        'replicas': 1,
        'template': {
          'metadata': {
            'labels': {
              'app': 'agitated-khorana'
            }
          },
          'spec': {
            'containers': [{
              'image': 'busybox',
              'name': 'agitated-khorana',
              'args': ['sleep', '10000'],
              'env': [{
                name: 'no_proxy',
                value: '*.local, 169.254/16'
              }, {
                name: 'PATH',
                value: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
              }],
              'volumeMounts': [{
                name: 'agitated-khorana-home-stuff',
                mountPath: '/home/stuff'
              }, {
                name: 'agitated-khorana-home-long-config',
                mountPath: '/home/long'
              }, {
                name: 'agitated-khorana-volume',
                mountPath: '/volume'
              }]
            }],
            'volumes': [{
              name: 'agitated-khorana-home-stuff',
              configMap: {
                name: 'agitated-khorana-home-stuff'
              }
            }, {
              name: 'agitated-khorana-home-long-config',
              configMap: {
                name: 'agitated-khorana-home-long-config'
              }
            }, {
              name: 'agitated-khorana-volume',
              configMap: {
                name: 'agitated-khorana-volume'
              }
            }]
          }
        }
      }
    }
  },
  configMaps: {
    'agitated-khorana-volume': {
      'apiVersion': 'v1',
      'kind': 'ConfigMap',
      'metadata': {
        'name': 'agitated-khorana-volume'
      },
      'data': {
        '1.txt': file1Txt,
        'ca.pem': fileCaPem,
        'cat': fileCat
      }
    },
    'agitated-khorana-home-stuff': {
      'apiVersion': 'v1',
      'kind': 'ConfigMap',
      'metadata': {
        'name': 'agitated-khorana-home-stuff'
      },
      'data': {
        '1.txt': file1Txt,
        'ca.pem': fileCaPem,
        'cat': fileCat
      }
    },
    'agitated-khorana-home-long-config': {
      'apiVersion': 'v1',
      'kind': 'ConfigMap',
      'metadata': {
        'name': 'agitated-khorana-home-long-config'
      },
      'data': {
        'config': fileFileTxt
      }
    }
  }
}

module.exports.ymlMountsDeploymentsAgitatedKhorana = fs.readFileSync(path.join(fixturesPath, 'k8-configs-mounts/deployments/agitated-khorana')).toString()
module.exports.ymlMountsConfigMapsAgitatedKhoranaVolume = fs.readFileSync(path.join(fixturesPath, 'k8-configs-mounts/configMaps/agitated-khorana-volume')).toString()
module.exports.ymlMountsConfigMapsAgitatedKhoranaHomeStuff = fs.readFileSync(path.join(fixturesPath, 'k8-configs-mounts/configMaps/agitated-khorana-home-stuff')).toString()
module.exports.ymlMountsConfigMapsAgitatedKhoranaHomeLongConfig = fs.readFileSync(path.join(fixturesPath, 'k8-configs-mounts/configMaps/agitated-khorana-home-long-config')).toString()
