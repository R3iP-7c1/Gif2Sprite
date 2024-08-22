import { gif2ImgArray, gif2Sprite } from './';
import './style.css';

const main = async () => {
  const play = async (index: number) => {
    if (data.imgArray.length <= 1) return;
    console.log('play', index);
    await new Promise((resolve) => setTimeout(resolve, data.delayArray![index]));
    const nextIndex = index < data.imgArray.length ? index + 1 : 0;
    console.log('nextIndex', nextIndex);
    imgElm.src = data.imgArray[nextIndex];
    play(nextIndex);
  }

  // const gifUrl = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTFseGlsdjFwc25rbmtscDE3bTMwaXIxODN1eGpkZ3ExM3IxeGlzciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g5R9dok94mrIvplmZd/giphy.gif';
  const gifUrl = 'https://europe1.discourse-cdn.com/figma/original/3X/7/1/7105e9c010b3d1f0ea893ed5ca3bd58e6cec090e.gif';
  // const gifUrl = 'https://sagapi.sagaxp.fr/uploads/logo_b3e9c4dca6.gif';
  const data = (await gif2ImgArray(gifUrl));

  const appElm = document.querySelector('#app')!;
  const imgElm = document.createElement('img');
  imgElm.src = data.imgArray[0];
  appElm.appendChild(imgElm);

  play(0)
}

document.addEventListener('DOMContentLoaded', main);