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
      file: './build/index.iife.js',
      plugins: [terser()]
    },
    {
      format: 'umd',
      name: 'DTableUtils',
      file: './build/index.umd.js',
    },
    {
      format: 'cjs',
      file: './build/index.js',
    },
    {
      format: 'es',
      file: './build/index.es.js',
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
