module.exports = require('yargs')
  .scriptName("ml-image-tool")
  .usage('$0 [args]')
  .option('input-folder', {
    alias: 'i',
  })
  .option('output-folder', {
    alias: 'o',
    default: 'out'
  })
  .option('convert-jpg', {
    alias: 'c',
    default: true
  })
  .option('shape-under', {
    alias: 's',
    default: 512
  })
  .option('rename-files', {
    alias: 'r',
    default: true
  })
  .option('num-start', {
    alias: 'n',
    default: 1,
    type: 'number'
  })
  .demand(['input-folder'], 'please provide input folder')
  .help()
  .argv