# img-about
[![NPM Version](http://img.shields.io/npm/v/img-about.svg?style=flat-square)](https://www.npmjs.com/package/img-about)
[![Download Month](http://img.shields.io/npm/dm/img-about.svg?style=flat-square)](https://www.npmjs.com/package/img-about)
![gzip with dependencies: 1kb](https://img.shields.io/badge/gzip--with--dependencies-1kb-brightgreen.svg "gzip with dependencies: 1kb")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A module for image deal, includes getting naturalSize, minifying in browser

## repository
https://github.com/livelybone/img-about.git

## Demo
http://livelybone.github.io/img-about/

## Installation
```bash
npm i -S img-about
```

## Global name
`ImgAbout`

## Usage
```js
import {getNaturalSize, imgMinify} from 'img-about';
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
> `(url: String) => Promise<Object: {width, height}>`

### imgMinify
> `(imgFile: [File, Blob], minifyOptions: MinifyOptions) => Promise<[Blob, String]>`

```js
/**
 * @element fixedSize: After comparing width with height of the image, it will set the value of which is smaller than another to the fixed value
 * */
var compressTypes = ['scale', 'fixedWidth', 'fixedHeight', 'fixedSize']

/**
 * @key {String} compressType, default to `scale`, options: `compressTypes`
 * @key {Number} scale, default to `1`, range: `0-1` usable when compressType is `scale`
 * @key {Number} width, default to `0`, if it is `0`, it means auto-computed, usable when compressType is `fixedWidth`
 * @key {Number} height, default to `0`, if it is `0`, it means auto-computed, usable when compressType is `fixedHeight`
 * @key {Number} size, default to `0`, the fixed value, usable when compressType is `fixedSize`
 * @key {Number} quality, default to `.8`, compress quality
 * @key {Boolean} toBlob, default to `true`, if it is false, the function will resolve to base64 string
 * */
const MinifyOptions = {
  compressType: 'scale',
  scale: 1,
  width: 0,
  height: 0,
  size: 0,
  quality: .8,
  toBlob: true,
}
```
