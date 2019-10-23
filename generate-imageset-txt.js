#!/usr/bin/env node
const fs = require('fs-extra')
const { basename, dirname, isAbsolute, join, extname } = require('path')
const isImage = require('is-image')
const argv = require('yargs')
  .scriptName("generate-imageset-txt")
  .usage('$0 [args]')
  .option('input-folder', {
    alias: 'i',
    default: '.'
  })
  .option('output-folder', {
    alias: 'o',
    default: '.'
  })
  .option('train', {
    default: 0.7
  })
  .option('val', {
    default: 0.2
  })
  .option('random', {
    default: true
  })
  .help()
  .argv

const files = fs.readdirSync(argv["input-folder"])
  ;
let sourceFolder = argv["input-folder"]
if (!isAbsolute(sourceFolder)) {
  sourceFolder = join(process.cwd(), sourceFolder)
}
let targetFolder = argv["output-folder"]
if (!isAbsolute(targetFolder)) {
  targetFolder = join(process.cwd(), targetFolder)
}

let all = []
for (let i = 0; i < files.length; i++) {
  let imageName = files[i]
  if (!isImage(imageName)) continue

  let ext = extname(imageName)
  let item = imageName.substr(0, imageName.length - ext.length)

  all.push(item)
}

if (argv.random) {
  shuffle(all)
}

writeTxt(all, join(targetFolder, 'all.txt'))
let trainEnd = Math.floor(all.length * argv.train)
writeTxt(all.slice(0, trainEnd), join(targetFolder, 'train.txt'))
let trainvalEnd = Math.floor(all.length * (argv.train + argv.val))
writeTxt(all.slice(trainEnd, trainvalEnd), join(targetFolder, 'val.txt'))
writeTxt(all.slice(0, trainvalEnd), join(targetFolder, 'trainval.txt'))
writeTxt(all.slice(trainvalEnd), join(targetFolder, 'test.txt'))

console.log('done!')


function writeTxt(arr, dist) {
  fs.writeFileSync(dist, arr.join('\n'), { encoding: 'ascii' })
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
    return array
  }
}