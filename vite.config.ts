/** @type {import('vite').UserConfig} */

import { resolve } from 'path';
import dts from 'vite-plugin-dts';


export default {
  resolve: {
    alias: [{ find: "path", replacement: "path-browserify" }]
  },
  plugins: [
    dts({
      include: [resolve(__dirname, './src/index.ts')],
      outDir: 'dist'
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'gif2sprite',
      formats: ['es'],
      fileName: 'index',
    },
    outDir: './dist'
  },
}