module.exports = require('yargs')
  .scriptName("ml-normalize-images")
  .usage('$0 [args]')
  .option('input-folder', {
    alias: 'i',
    desc: 'folder with images'
  })
  .option('output-folder', {
    alias: 'o',
    default: 'out',
    desc: 'folder to generate normalized images'
  })
  .option('convert-jpg', {
    alias: 'c',
    default: true,
    type: 'boolean',
    desc: 'convert all images to jpg format'
  })
  .option('shape-under', {
    alias: 's',
    default: 512,
    type: 'number',
    desc: 'crop images if width/height larger than specified'
  })
  .option('rename-files', {
    alias: 'r',
    default: true,
    type: 'boolean',
    desc: 'rename all files to increasing numbers'
  })
  .option('num-start', {
    alias: 'n',
    default: 1,
    type: 'number',
    desc: 'start number when rename'
  })
  .demand(['input-folder'], 'please provide input folder')
  .help()
  .argv