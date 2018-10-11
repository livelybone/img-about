/* global Promise */
export default function getNaturalSize(url) {
  return new Promise(function (res, rej) {
    var img = document.createElement('img')

    img.onload = function () {
      res({ width: img.width, height: img.height })
      document.body.removeChild(img)
    }

    img.onerror = function () {
      rej(new Error('Image loaded error'))
    }

    img.style.position = 'fixed'
    img.style.zIndex = '-1000'
    img.style.opacity = '0'
    img.src = url
    document.body.appendChild(img)
  })
}
