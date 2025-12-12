import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import versionInjector from 'rollup-plugin-version-injector';
import copy from 'rollup-plugin-copy';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const pkg = require('./package.json');

export default {
  input: 'src/entrypoint.ts',
  output: [
    {
      // Minified file for actual usage
      file: 'dist/beacon.js',
      format: 'iife',
    },
    {
      // Minified file for actual usage
      file: `sandbox/beacon.js`,
      format: 'iife',
    },
  ],
  plugins: [
    resolve({ browser: true }),
    typescript({
      tsconfig: 'tsconfig.json',
    }),
    versionInjector(),
    json(),
    commonjs(),
    terser({}),
  ],
};
