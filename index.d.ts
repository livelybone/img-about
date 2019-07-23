interface Size {
  width: number
  height: number
}

declare type Base64Url = string

/**
 * Url of image
 * */
declare type ImageUrl = string

/**
 * Get the image size corresponding to the url
 * */
export function getSizeOfUrl(url: ImageUrl): Promise<Size>

/**
 * Whether the canvas is available in current browser
 * */
export const canvasSupport: boolean

declare type ImgType = ImageUrl | Base64Url | HTMLImageElement | File | FileList | Blob

/**
 * Get the img size corresponding
 * */
export function getNaturalSize(img: ImgType): Promise<Size>

declare type CompressType =
  'scale' |           // Resize the image by `options.scale`
  'fixedWidth' |      // Set the width of the image to a fixed value -- `options.imageSize`
  'fixedHeight' |     // Set the height of the image to a fixed value -- `options.imageSize`
  'fixedSize'         // Set the smaller between width and height of the image to a fixed value -- `options.imageSize`

declare interface CompressOptions {
  /**
   * Compress type, options: `compressTypes`
   *
   * default to 'scale'
   * */
  compressType?: CompressType
  /**
   * Scale factor, works when compressType is `scale`
   *
   * default to 1
   * */
  scale?: number
  /**
   * The fixed value of size,
   * works when compressType is `fixedWidth`, `fixedHeight` or `fixedSize`.
   * If imageSize is 0, it means convert to naturalSize
   *
   * default to 0
   * */
  imageSize?: number
  /**
   * The mine type of image returned
   *
   * default to the type of `imgFile` or 'image/png'
   * */
  imageType?: string
  /**
   * Compress quality, works when imageType is `image/jpeg` or `image/webp`
   *
   * default to 0.8
   * */
  quality?: number
  /**
   * If it is false, the promise returned will be resolved with a base64 string
   *
   * default to true
   * */
  toBlob?: boolean
}

/**
 * Compress image in browser
 * */
export function imgCompress(imgFile: File | Blob, compressOptions: CompressOptions): Promise<Blob | Base64Url>
