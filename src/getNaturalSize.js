/* global Promise */
import { blobToBase64 } from 'base64-blob'
import { getSizeOfUrl } from './utils'

/**
 * @param   { String|Image|File|FileList|Blob }   img
 * @return  { Promise }
 * */
export default function getNaturalSize(img) {
  return new Promise(function (res, rej) {
    if (typeof img === 'string') {
      res(getSizeOfUrl(img))
    } else if (
      img instanceof Image
      || img instanceof Element
    ) {
      if (img.naturalWidth) {
        res({ width: img.naturalWidth, height: img.naturalHeight })
      } else {
        res(getSizeOfUrl(img.src))
      }
    } else if (
      img instanceof FileList
      || img instanceof File
      || img instanceof Blob
    ) {
      var f = img[0] || img
      res(getSizeOfUrl(blobToBase64(f)))
    } else {
      rej(new Error(
        'The type of param `img` is not matched.' +
        ' It should be an instance of one of the String, Image, File, FileList and Blob'
      ))
    }
  })
}
