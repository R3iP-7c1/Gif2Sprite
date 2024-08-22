import { NdArray } from "ndarray";
import getPixels from "get-pixels";
import { decompressFrames, parseGIF } from "gifuct-js";

export interface G2Sprite {
  animated: boolean,
  width: number,
  height: number,
  spriteData: string,
  delayArray?: number[]
}

export interface G2ImgArray {
  animated: boolean,
  width: number,
  height: number,
  imgArray: string[],
  delayArray?: number[]
}

export const gif2Sprite = async (url: string): Promise<G2Sprite> => {
  const response = await fetch(url);
  const g2sprite: G2Sprite = await getG2Sprite(url);

  const arrayBuffer = await response.arrayBuffer();
  const parsedGif = parseGIF(arrayBuffer);
  const frames = decompressFrames(parsedGif, true);
  if (g2sprite.animated) g2sprite.delayArray = frames.map(frame => frame.delay);

  return g2sprite;
}

export const gif2ImgArray = async (url: string): Promise<G2ImgArray> => {
  const response = await fetch(url);
  const g2ImgArray: G2ImgArray = await getG2ImgArray(url);

  const arrayBuffer = await response.arrayBuffer();
  const parsedGif = parseGIF(arrayBuffer);
  const frames = decompressFrames(parsedGif, true);
  if (g2ImgArray.animated) g2ImgArray.delayArray = frames.map(frame => frame.delay);

  return g2ImgArray;
}

const getG2ImgArray = (url: string): Promise<G2ImgArray> => {
  return new Promise((resolve, reject) => {
    getImageDataArray(url)
      .then(res => {
        resolve(generateImgArray(res.ndArrayArray, res.width, res.height));
      })
      .catch(err => reject(err))
  });
}

const getG2Sprite = (url: string): Promise<G2Sprite> => {
  return new Promise((resolve, reject) => {
    getImageDataArray(url)
      .then(res => {
        resolve(generateSprite(res.ndArrayArray, res.width, res.height));
      })
      .catch(err => reject(err))
  });
}

const getImageDataArray = (url: string): Promise<{ ndArrayArray: NdArray<Uint8Array>[], width: number, height: number }> => {
  return new Promise((resolve, reject) => {
    getPixels(url, (err, pixels) => {
      if (err) {
        reject(err);
      } else {
        const imageNdarrayArray: NdArray<Uint8Array>[] = [];
        const { shape } = pixels;

        const [frames, width, height, channels] = shape;

        const numPixelsInFrame = width * height;

        for (let i = 0; i < frames; ++i) {
          if (i > 0) {
            const currIndex = pixels.index(i, 0, 0, 0)
            const prevIndex = pixels.index(i - 1, 0, 0, 0)

            for (let j = 0; j < numPixelsInFrame; ++j) {
              const curr = currIndex + j * channels

              if (pixels.data[curr + channels - 1] === 0) {
                const prev = prevIndex + j * channels

                for (let k = 0; k < channels; ++k) {
                  pixels.data[curr + k] = pixels.data[prev + k]
                }
              }
            }
          }
          imageNdarrayArray.push(pixels.pick(i));
        }

        resolve({ndArrayArray : imageNdarrayArray, width: width, height: height});
      }
    });
  });
}

const generateSprite = (imageNdarrayArray: NdArray<Uint8Array>[], width: number, height: number): G2Sprite => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width * imageNdarrayArray.length;
  canvas.height = height;
    
  imageNdarrayArray.forEach((imageNdarray, index) => {
    const imageData = ctx!.createImageData(width, height);
    imageData.data.set(imageNdarray.data.slice(width * height * 4 * index, width * height * 4 * (index + 1)));

    ctx!.putImageData(imageData, width * index, 0);
  });

  return {
    animated: imageNdarrayArray.length > 1,
    width,
    height,
    spriteData: canvas.toDataURL(),
  }
}

const generateImgArray = (imageNdarrayArray: NdArray<Uint8Array>[], width: number, height: number): G2ImgArray => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  const imgArray: string[] = [];

  imageNdarrayArray.forEach((imageNdarray, index) => {
    const imageData = ctx!.createImageData(width, height);
    imageData.data.set(imageNdarray.data.slice(width * height * 4 * index, width * height * 4 * (index + 1)));

    ctx!.putImageData(imageData, 0, 0);
    imgArray.push(canvas.toDataURL());
  });

  return {
    animated: imageNdarrayArray.length > 1,
    width,
    height,
    imgArray: imgArray
  }
}