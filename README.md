# @livelybone/img-min
[![NPM Version](http://img.shields.io/npm/v/@livelybone/img-min.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/img-min)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/img-min.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/img-min)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A module for image minify in both browser and node

## repository
https://github.com/livelybone/img-min.git

## Demo
http://livelybone.github.io/@livelybone/img-min/

## Installation
```bash
npm i -S @livelybone/img-min
```

## Global name
`ImgMin`

## Usage
```js
import ImgMin from '@livelybone/img-min';
```

when you want to set this module as external while you are developing another module, you should import it like this:
```js
import * as ImgMin  from '@livelybone/img-min'

// then use it by need
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/img-min/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/img-min/lib/umd/<--module-->.js"></script>
```
