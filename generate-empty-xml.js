#!/usr/bin/env node
const fs = require('fs-extra')
const { getImageMagickVersion, info } = require('easyimage')
const { basename, dirname, isAbsolute, join, extname } = require('path')
const isImage = require('is-image')
const argv = require('yargs')
  .scriptName("generate-empty-xml")
  .usage('$0 [args]')
  .option('input-folder', {
    alias: 'i',
  })
  .option('output-folder', {
    alias: 'o',
    default: 'out'
  })
  .demand(['input-folder'], 'please provide input folder')
  .help()
  .argv

const files = fs.readdirSync(argv["input-folder"])
  ;
(async function () {
  console.log(await getImageMagickVersion())
  let sourceFolder = argv["input-folder"]
  if (!isAbsolute(sourceFolder)) {
    sourceFolder = join(process.cwd(), sourceFolder)
  }
  let targetFolder = argv["output-folder"]
  if (!isAbsolute(targetFolder)) {
    targetFolder = join(process.cwd(), targetFolder)
  }

  for (let i = 0; i < files.length; i++) {
    let imageName = files[i]
    if (!isImage(imageName)) continue

    let ext = extname(imageName)
    let targetName = imageName.substr(0, imageName.length - ext.length) + '.xml'


    let src = join(sourceFolder, imageName)
    let dst = join(targetFolder, targetName)
    if(fs.existsSync(dst)) continue

    try {
      const { width, height } = await info(src)
      writeXml(src, width, height, dst)
    } catch (e) {
      console.log(e)
    }
    console.log(`generated ${dst}`)
  }
  console.log('done!')
})()


function writeXml(src, width, height, dist) {
  let imgName = basename(src)
  let folder = basename(dirname(src))
  let str = `<annotation>
<folder>${folder}</folder>
<filename>${imgName}</filename>
<path>${src}</path>
<source>
  <database>Unknown</database>
</source>
<size>
  <width>${width}</width>
  <height>${height}</height>
  <depth>3</depth>
</size>
<segmented>0</segmented>
</annotation>`

  fs.writeFileSync(dist, str)
}