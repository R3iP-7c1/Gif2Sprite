# Gif2Sprite

Convert a gif (animated or not) to data image sprite (including inter-frame coalescing)

```
yarn add pi3r-gif2sprite
```

```
import { gif2Sprite } from 'gif2sprite';

const gifUrl = 'GifUrl';
const mySpriteData = await gif2Sprite(gifUrl);
```

The function ``` gif2Sprite(url :string) ``` return a ```Promise<G2Sprite>``` :

```
interface G2Sprite {
  animated: boolean,      //the gif is an animated gif or not
  width: number,          //the width of the frames
  height: number,         //the height of the frames
  spriteData: string,     //the base64 sprite image
  delayArray?: number[]   //the delay of each frames (if the gif is an animated gif)
}
```