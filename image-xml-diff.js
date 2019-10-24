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
  .help()
  .argv
let imageFolder = argv["image-folder"], xmlFolder = argv["xml-folder"]
if (!isAbsolute(imageFolder)) {
  imageFolder = join(process.cwd(), imageFolder)
}
if (!isAbsolute(xmlFolder)) {
  xmlFolder = join(process.cwd(), xmlFolder)
}

Set.prototype.difference = function (otherSet) {
  // creating new set to store difference 
  var differenceSet = new Set();

  // iterate over the values 
  for (var elem of this) {
    // if the value[i] is not present  
    // in otherSet add to the differenceSet 
    if (!otherSet.has(elem))
      differenceSet.add(elem);
  }

  // returns values of differenceSet 
  return differenceSet;
}

const images = new Set(fs.readdirSync(imageFolder).map(x => basename(x, '.jpg')))
const xmls = new Set(fs.readdirSync(xmlFolder).map(x => basename(x, '.xml')))

let noImage = [...images.difference(xmls)]
console.log(`image exists but not xml: ${noImage.join(',')}`)

let noXml = [...xmls.difference(images)]
console.log(`xml exists but not image: ${noXml.join(',')}`)