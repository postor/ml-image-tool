#!/usr/bin/env node
const fs = require('fs-extra')
const { basename, dirname, isAbsolute, join, extname } = require('path')
const { parseString } = require('xml2js')
const argv = require('yargs')
  .scriptName("collect-classes")
  .usage('$0 [args]')
  .option('input-folder', {
    alias: 'i',
    default: '.'
  })
  .option('replace', {
    alias: 'r',
    default: 0.1
  })
  .help()
  .argv

let sourceFolder = argv["input-folder"]
if (!isAbsolute(sourceFolder)) {
  sourceFolder = join(process.cwd(), sourceFolder)
}


const files = fs.readdirSync(argv["input-folder"])

for (let i = 0; i < files.length; i++) {
  let txtName = files[i]
  if (!txtName.endsWith('.txt')) continue
  let str = fs.readFileSync(join(sourceFolder, txtName)).toString()
  if(/\s0\.0\s/.test(str)){
    console.log(`file ${txtName} contains '0.0'`)
  }
}

