/* global Promise */
import { base64ToBlob, blobToBase64 } from 'base64-blob'
import getNaturalSize from './getNaturalSize'

function canvasSupport() {
  var canvas = document.createElement('canvas')
  return !!canvas.getContext
}

export default function imgMinify(imgFile, minifyOptions) {
  if (!canvasSupport()) return Promise.reject(new Error('Canvas is not supported in your browser'))

  // fixedSize: After comparing width with height of the image, set the value of which is smaller than another to the fixed value
  var compressTypes = ['scale', 'fixedWidth', 'fixedHeight', 'fixedSize']

  var defaultOptions = {
    compressType: 'scale', // compress type, options: `compressTypes`
    scale: 1, // scale factor, usable when compressType is `scale`
    width: 0, // if it is `0`, it means auto-computed, usable when compressType is `fixedWidth`
    height: 0, // if it is `0`, it means auto-computed, usable when compressType is `fixedHeight`
    size: 0, // min size value, usable when compressType is `fixedSize`
    quality: .8, // compress quality
    toBlob: true, // if it is false, the function will resolve to base64 string
  }

  var options = defaultOptions

  if (minifyOptions) {
    Object.keys(defaultOptions).forEach(function (key) {
      options[key] = minifyOptions[key] !== undefined ? minifyOptions[key] : defaultOptions[key]
    })
  }

  return blobToBase64(imgFile).then(function (url) {
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    return getNaturalSize(url).then(function (size) {
      var width = size.width
      var height = size.height
      var cWidth, cHeight
      if (options.compressType === compressTypes[1]) {
        cWidth = options.width
        cHeight = options.width * height / width
      } else if (options.compressType === compressTypes[2]) {
        cHeight = options.height
        cWidth = options.height * width / height
      } else if (options.compressType === compressTypes[3]) {
        if (width > height) {
          cHeight = options.size
          cWidth = options.size * width / height
        } else {
          cWidth = options.size
          cHeight = options.size * height / width
        }
      } else {
        cWidth = width * options.scale
        cHeight = height * options.scale
      }
      canvas.width = cWidth
      canvas.height = cHeight
      var img = document.createElement('img')
      img.src = url
      ctx.drawImage(img, 0, 0, cWidth, cHeight)
      var result = canvas.toDataURL('image/jpeg', options.quality)
      return options.toBlob ? base64ToBlob(result) : result
    })
  })
}
