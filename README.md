# kontainer
Create basic kubernetes configs from docker containers. This inspects docker containers and generates kubernetes YAML files to deploy them.

Currently it creates `Deployments`, `Services` and `ConfigMaps`

## Deployments
Deployments are always created per container. It includes docker image and env variables. If there are host bind mounts, volumes are defined. If there are exposed ports a container ports are defined.

## Services
Services are created if there are any ports.

## ConfigMaps
Config maps are created for all host bound volumes. It reads the mounted file or directory creates a config map with the existing files.

# usage
```
node cli -c <containerId> -o <pathToOutputFolder>
```

# flags
`-c, --containerId <string>` - containerId to generate kubernetes configs for

`-o, --outpath <path>` - directory to place kubernetes config files

`-m, --remove-mounts <regex>` - if source mount matches this regex, then it is ignored. This option is useful if you want to remove log or database mounts.

`-i, --use-image-as-name` - use image name as name for resources. (default is container name)

`-r, --root-path` - root path for volumes. (useful when run in a container)

`-a, --all` - get config for all containers on host

# Notes
 * This tool does not generate production ready configs. It is meant to get you started with base templates.
 * I highly recommend changing ConfigMaps to secrets if your mounted files contain sensitive information.
 * If you would like to see some other features please open an issue or create a PR ;)


# Not Supported ... Yet!
 * mount file to root (-v /some/file.txt:/file.txt)
 * mounts with directories in them
 * networks
 * non-bind volumes
