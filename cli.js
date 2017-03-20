const program = require('commander')

const configCreator = require('./lib/config-creator.js')

program
  .version('v1.0.0')
  .option('-c, --containerId <string>', 'containerId generate kubernetes configs for')
  .option('-o, --outpath <path>', 'directory to place kubernetes config files')
  .option('-m, --remove-mounts <regex>', 'if source mount matches this regex, then it is ignored')
  .option('-i, --use-image-as-name', 'use image name as default name')
  .option('-a, --all', 'get config for all containers on host')
  .parse(process.argv)

if (!program.containerId && !program.all) {
  console.error('katastrophe! missing --containerId or --all')
  process.exit(1)
}

if (!program.outpath) {
  console.error('katastrophe! missing --outpath')
  process.exit(1)
}

if (program.all) {
  configCreator.fromContainers(program.outpath, {
    removeMounts: program.removeMounts,
    useImageAsName: program.useImageAsName
  })
  .catch((err) => {
    console.error('katastrophe!', err)
  })
} else {
  configCreator.fromContainer(program.containerId, program.outpath, {
    removeMounts: program.removeMounts,
    useImageAsName: program.useImageAsName
  })
  .catch((err) => {
    console.error('katastrophe!', err)
  })
}
