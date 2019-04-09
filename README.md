# img-about
[![NPM Version](http://img.shields.io/npm/v/img-about.svg?style=flat-square)](https://www.npmjs.com/package/img-about)
[![Download Month](http://img.shields.io/npm/dm/img-about.svg?style=flat-square)](https://www.npmjs.com/package/img-about)
![gzip with dependencies: 1.3kb](https://img.shields.io/badge/gzip--with--dependencies-1.3kb-brightgreen.svg "gzip with dependencies: 1.3kb")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A module for image processing in browser, includes getting naturalSize, zooming, compressing... wrapped by Promise

You may need a Promise polyfill while use old IE browser

## repository
https://github.com/livelybone/img-about.git

## Demo
https://livelybone.github.io/tool/img-about/

## Installation
```bash
npm i -S img-about
```

## Global name
`ImgAbout`

## Usage
```js
import {getNaturalSize, imgCompress} from 'img-about';
```

when you want to set this module as external while you are developing another module, you should import it like this:
```js
import * as ImgAbout  from 'img-about'

// then use it by need
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/img-about/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/img-about/lib/umd/<--module-->.js"></script>
```

## Functions

### getNaturalSize
> `(url: String|Image|File|FileList|Blob) => Promise<Object: {width, height}>`

### imgCompress
> `(imgFile: File|Blob, compressOptions: CompressOptions) => Promise<Blob|String>`

```js
var compressTypes = [
    'scale',        // Resize the image by `options.scale`
    'fixedWidth',   // Set the width of the image to a fixed value -- `options.imageSize`
    'fixedHeight',  // Set the height of the image to a fixed value -- `options.imageSize`
    'fixedSize',    // Set the smaller between width and height of the image to a fixed value -- `options.imageSize`
  ]

/**
 * @property   { String }      compressOptions.compressType      default to 'scale'
 * @property   { Number }      compressOptions.scale             default to 1
 * @property   { Number }      compressOptions.imageSize         default to 0
 * @property   { String }      compressOptions.imageType         default to default to the type of `imgFile` or 'image/png'
 * @property   { Number }      compressOptions.quality           default to 0.8
 * @property   { Boolean }     compressOptions.toBlob            default to true
 * */
var defaultOptions = {
  compressType: compressTypes[0],           // Compress type, options: `compressTypes`
  scale: 1,                                 // Scale factor, works when compressType is `scale`
  imageSize: 0,                             // The fixed value of size, works when compressType is `fixedWidth`, `fixedHeight` or `fixedSize`. If imageSize is 0, it means convert to naturalSize
  imageType: imgFile.type || 'image/png',   // The mine type of image returned
  quality: .8,                              // Compress quality, works when imageType is `image/jpeg` or `image/webp`
  toBlob: true,                             // If it is false, the promise returned will be resolved with a base64 string
}
```
