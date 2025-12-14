import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import versionInjector from 'rollup-plugin-version-injector';
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
      // Minified file for docs examples
      file: `docs/static/beacon.js`,
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
    terser({
      compress: {
        passes: 2,
        drop_console: false, // Keep console for debugging
        pure_funcs: ['console.debug'], // Remove debug logs in production
      },
      format: {
        comments: false,
      },
    }),
  ],
};
