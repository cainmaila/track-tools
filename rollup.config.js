import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
export default {
  input: 'sdk/track-editor-sdk.js',
  output: {
    file: 'public/track-editor-sdk.min.js',
    format: 'iife',
    name: 'TrackEditorSDK',
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
