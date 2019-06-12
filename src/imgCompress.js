/* global Promise */
import { base64ToBlob, blobToBase64 } from 'base64-blob'
import getNaturalSize from './getNaturalSize'
import { canvasSupport } from './utils'

/**
 * @param   { File|Blob }   imgFile
 * @param   { Object }      [compressOptions]
 * @param   { String }      compressOptions.compressType      default to 'scale'
 * @param   { Number }      compressOptions.scale             default to 1
 * @param   { Number }      compressOptions.imageSize         default to 0
 * @param   { String }      compressOptions.imageType         default to the type of `imgFile` or 'image/png'
 * @param   { Number }      compressOptions.quality           default to 0.8
 * @param   { Boolean }     compressOptions.toBlob            default to true
 * @return  { Promise }
 * */
export default function imgCompress(imgFile, compressOptions) {
  if (!canvasSupport) {
    return Promise.reject(new Error('Canvas is not supported in your browser'))
  }

  if (!(imgFile instanceof File || imgFile instanceof Blob)) {
    return Promise.reject(new Error(
      'The type of param `imgFile` is not matched' +
      ' It should be an instance of one of the File and Blob'
    ))
  }

  var compressTypes = [
    'scale',        // Resize the image by `options.scale`
    'fixedWidth',   // Set the width of the image to a fixed value -- `options.imageSize`
    'fixedHeight',  // Set the height of the image to a fixed value -- `options.imageSize`
    'fixedSize',    // Set the smaller between width and height of the image to a fixed value -- `options.imageSize`
  ]

  var defaultOptions = {
    compressType: compressTypes[0],           // Compress type, options: `compressTypes`
    scale: 1,                                 // Scale factor, works when compressType is `scale`
    imageSize: 0,                             // The fixed value of size, works when compressType is `fixedWidth`, `fixedHeight` or `fixedSize`. If imageSize is 0, it means convert to naturalSize
    imageType: imgFile.type || 'image/png',   // The mine type of image returned
    quality: .8,                              // Compress quality, works when imageType is `image/jpeg` or `image/webp`
    toBlob: true,                             // If it is false, the promise returned will be resolved with a base64 string
  }

  var options = defaultOptions

  // Merge options
  if (compressOptions) {
    Object.keys(defaultOptions).forEach(function (key) {
      options[key] = compressOptions[key] !== undefined
        ? compressOptions[key] : defaultOptions[key]
    })
  }

  return blobToBase64(imgFile)
    .then(function (url) {
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')

      return getNaturalSize(url)
        .then(function (size) {
          var width = size.width
          var height = size.height

          var cWidth, cHeight

          // Calculate `cWidth`, `cHeight`
          if (options.compressType === compressTypes[1]) {
            cWidth = options.imageSize || width
            cHeight = cWidth * height / width
          } else if (options.compressType === compressTypes[2]) {
            cHeight = options.imageSize || height
            cWidth = cHeight * width / height
          } else if (options.compressType === compressTypes[3]) {
            if (width > height) {
              cHeight = options.imageSize || height
              cWidth = cHeight * width / height
            } else {
              cWidth = options.imageSize || width
              cHeight = cWidth * height / width
            }
          } else {
            cWidth = width * options.scale
            cHeight = height * options.scale
          }

          var img = document.createElement('img')
          img.src = url

          // Draw image in canvas
          canvas.width = cWidth
          canvas.height = cHeight
          ctx.drawImage(img, 0, 0, cWidth, cHeight)

          var result = canvas.toDataURL(options.imageType, options.quality)
          return options.toBlob ? base64ToBlob(result) : result
        })
    })
}
