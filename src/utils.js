/* global Promise */

/**
 * @param   { String }    url
 * @return  { Promise }
 * */
export function getSizeOfUrl(url) {
  return new Promise(function (res, rej) {
    var img = document.createElement('img')

    var loaded = function () {
      res({ width: img.width, height: img.height })
    }

    img.onload = loaded
    img.onerror = function () {
      rej(new Error('Image<' + url + '> loaded error'))
    }

    img.src = url
    if (img.complete) loaded()
  })
}

/**
 * Determine if the canvas is available
 * */
var canvasSupport = (function () {
  var canvas = document.createElement('canvas')
  return !!canvas.getContext
})()

export { canvasSupport }
