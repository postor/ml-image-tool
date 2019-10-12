#!/usr/bin/env node
const { join, extname, isAbsolute } = require('path')
const fs = require('fs-extra')
const argv = require('./argv')
const isImage = require('is-image')
const { resize, convert, getImageMagickVersion, info } = require('easyimage')

if (!fs.existsSync(argv["input-folder"])) {
  console.log('in folder is not valid!')
  return
}

fs.ensureDir(argv["output-folder"])

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
    if (!isImage(imageName)) return

    let ext = extname(imageName)
    let targetName = argv["rename-files"] ? i + argv["num-start"] : imageName.trimRight(ext)
    let targetExt = argv["convert-jpg"] ? '.jpg' : ext

    let src = join(sourceFolder, imageName)
    let dst = join(targetFolder, targetName + targetExt)
    try {
      // const { width, height } = await info(src)
      await resize({
        src,
        dst,
        width: argv["shape-under"],
        height: argv["shape-under"],
        ignoreAspectRatio: false
      })
    } catch (e) {
      console.log(e)
    }
    console.log(`generated ${dst}`)
  }
  console.log('done!')
})()
