import { NdArray } from "ndarray";
import getPixels from "get-pixels";

export const gifToSprite = async (url: string): Promise<unknown> => {
  return getImageDataArray(url);
}

const getImageDataArray = (url: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    getPixels(url, (err, pixels) => {
      if (err) {
        reject(err);
      } else {
        console.log(pixels);
        const imageNdarrayArray: NdArray<Uint8Array>[] = [];
        const { shape } = pixels;

        if (shape.length === 4) {

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

          resolve(generateSprite(imageNdarrayArray, width, height));
        } else {
          resolve(shape);
        }

      }
    });
  });
}

const generateSprite = (imageNdarrayArray: NdArray<Uint8Array>[], width: number, height: number): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width * imageNdarrayArray.length;
  canvas.height = height;
    
    imageNdarrayArray.forEach((imageNdarray, index) => {
      const imageData = ctx!.createImageData(width, height);
      imageData.data.set(imageNdarray.data.slice(width*height*4 * index, width*height*4 * (index + 1)));

      ctx!.putImageData(imageData, width * index, 0);
    });

  return canvas.toDataURL();
}
