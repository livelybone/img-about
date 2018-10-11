/* global Promise */
function urlGet(url) {
  return new Promise(function (res, rej) {
    var img = document.createElement('img')

    var loaded = function () {
      res({ width: img.width, height: img.height })
    }

    img.onload = loaded
    img.onerror = function () {
      rej(new Error('Image loaded error'))
    }
    
    img.src = url
    if (img.complete) loaded()
  })
}

export default function getNaturalSize(url) {
  return new Promise(function (res) {
    if (typeof url === 'string') {
      res(urlGet(url))
    } else {
      if (url.naturalWidth) {
        res({ width: url.naturalWidth, height: url.naturalHeight })
      } else {
        res(urlGet(url.src))
      }
    }
  })
}
