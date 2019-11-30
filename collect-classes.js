#!/usr/bin/env node
const fs = require('fs-extra')
const { basename, dirname, isAbsolute, join, extname } = require('path')
const { parseString } = require('xml2js')
const Counter = require('./Counter')

const argv = require('yargs')
  .scriptName("collect-classes")
  .usage('$0 [args]')
  .option('input-folder', {
    alias: 'i',
    default: '.'
  })
  .option('move-empty', {
    alias: 'm',
    default: ''
  })
  .option('find', {
    alias: 'f',
    default: ''
  })
  .help()
  .argv

let sourceFolder = argv["input-folder"], emptyFolder = argv["move-empty"]
if (!isAbsolute(sourceFolder)) {
  sourceFolder = join(process.cwd(), sourceFolder)
}
if (emptyFolder) {
  if (!isAbsolute(emptyFolder)) {
    emptyFolder = join(process.cwd(), emptyFolder)
  }
  fs.ensureDir(emptyFolder)
}

const files = fs.readdirSync(argv["input-folder"])
let all = new Counter()

for (let i = 0; i < files.length; i++) {
  let xmlName = files[i]
  if (!xmlName.endsWith('.xml')) continue
  parseString(fs.readFileSync(join(sourceFolder, xmlName)), (err, xml) => {
    if (err) {
      console.log(xmlName, err)
      return
    }

    try {
      if (!xml.annotation.object) {
        if (emptyFolder) {
          fs.move(join(sourceFolder, xmlName), join(emptyFolder, xmlName))
        }
        return
      }
      xml.annotation.object.forEach(({ name }) => {
        all.add(name[0])
        if (name[0] === argv.find) {
          console.log(`found "${argv.find}" in ${xmlName}`)
        }
      })

    } catch (e) {
      console.log(xmlName, e)
    }
    // console.log(xmlName, JSON.stringify(xml))
  })
}

console.log(all.get())
console.log(Object.keys(all.get()))


