import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  input: [
    './src/index.js',
  ],
  output: [
    {
      dir: './lib',
      format: 'es',
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src'
    },
  ],
  external: [
    /@babel\/runtime/
  ],
  plugins: [
    resolve(),   // resolve third-party modules
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
    }),
    json(),      // support JSON files
    commonjs(),
  ],
});
