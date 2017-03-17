const program = require('commander')

const configCreator = require('./lib/config-creator.js')

program
  .version('v1.0.0')
  .option('-c, --containerId <type>', 'containerId generate kubernetes configs for')
  .option('-o, --outpath <type>', 'directory to place kubernetes config files')
  .parse(process.argv)

if (!program.containerId) {
  console.error('katastrophe! missing --containerId')
  process.exit(1)
}

if (!program.outpath) {
  console.error('katastrophe! missing --outpath')
  process.exit(1)
}

configCreator.fromContainer(program.containerId, program.outpath)
.catch((err) => {
  console.error('katastrophe!', err)
})
