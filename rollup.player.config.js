import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
export default {
  input: 'sdk/track-player-sdk.js',
  output: {
    file: 'public/track-player-sdk.min.js',
    format: 'iife',
    name: 'TrackPlayerSDK',
  },
  plugins: [
    commonjs(),
    resolve(),
    terser({}),
    babel({
      babelHelpers: 'runtime',
      plugins: ['@babel/plugin-transform-runtime'],
    }),
  ],
}
