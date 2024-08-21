# Gif2Sprite

Convert a gif (animated or not) to data image sprite (including inter-frame coalescing)

```
import { gif2Sprite } from 'gif2sprite';

const gifUrl = 'GifUrl';
const mySpriteData = await gif2Sprite(gifUrl);
```