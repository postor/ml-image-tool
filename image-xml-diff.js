#!/usr/bin/env node
const fs = require('fs-extra')
const { basename, dirname, isAbsolute, join, extname } = require('path')
const { parseString } = require('xml2js')
const argv = require('yargs')
  .scriptName("collect-classes")
  .usage('$0 [args]')
  .option('image-folder', {
    alias: 'i',
    default: 'JPEGImages'
  })
  .option('xml-folder', {
    alias: 'x',
    default: 'Annotations'
  })
  .option('move-not-paired', {
    alias: 'm',
    default: ''
  })
  .help()
  .argv
let imageFolder = argv["image-folder"], xmlFolder = argv["xml-folder"], moveFolder = argv["move-not-paired"]
if (!isAbsolute(imageFolder)) {
  imageFolder = join(process.cwd(), imageFolder)
}
if (!isAbsolute(xmlFolder)) {
  xmlFolder = join(process.cwd(), xmlFolder)
}
if (moveFolder) {
  if (!isAbsolute(moveFolder)) {
    moveFolder = join(process.cwd(), moveFolder)
  }
  fs.ensureDir(moveFolder)
}

Set.prototype.difference = function (otherSet) {
  // creating new set to store difference 
  var differenceSet = new Set();

  // iterate over the values 
  for (var elem of this) {
    // if the value[i] is not present  
    // in otherSet add to the differenceSet 
    if (!otherSet.has(elem))
      differenceSet.add(elem)
  }

  // returns values of differenceSet 
  return differenceSet
}

const images = new Set(fs.readdirSync(imageFolder).filter(x => x.endsWith('.jpg')).map(x => basename(x, '.jpg')))
const xmls = new Set(fs.readdirSync(xmlFolder).filter(x => x.endsWith('.xml')).map(x => basename(x, '.xml')))

let noImage = [...xmls.difference(images)]
console.log(`image exists but not xml: ${noImage.join(',')}`)

if (moveFolder) {
  noImage.forEach(x => {
    fs.moveSync(join(xmlFolder, `${x}.xml`), join(moveFolder, `${x}.xml`))
  })
  console.log(`moved ${noImage.length} xmls to ${moveFolder}`)
}

let noXml = [...images.difference(xmls)]
console.log(`xml exists but not image: ${noXml.join(',')}`)

if (moveFolder) {
  noXml.forEach(x => {
    fs.moveSync(join(imageFolder, `${x}.jpg`), join(moveFolder, `${x}.jpg`))
  })
  console.log(`moved ${noXml.length} jpgs to ${moveFolder}`)
}