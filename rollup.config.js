import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  input: [
    './src/index.js',
  ],
  output: [
    {
      format: 'iife',
      name: 'DTableUtils',
      file: './dist/index.iife.js',
      plugins: [terser()]
    },
    {
      format: 'umd',
      name: 'DTableUtils',
      file: './dist/index.umd.js',
    },
    {
      format: 'cjs',
      file: './dist/index.js',
    },
    {
      format: 'es',
      file: './dist/index.es.js',
    },
  ],
  plugins: [
    resolve(),   // resolve third-party modules
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    json(),      // support JSON files
    commonjs(),
  ],
});
