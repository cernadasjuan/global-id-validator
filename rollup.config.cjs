/* eslint-disable @typescript-eslint/no-var-requires */
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');
const pkg = require('./package.json');
const { rmSync } = require('fs');

// Clean dist directory before build
try {
  rmSync('./dist', { recursive: true, force: true });
  console.log('Cleaned dist directory');
} catch (error) {
  console.error('Error cleaning dist directory:', error);
}

// Custom plugin to clean up validators directory after build
const cleanValidatorsPlugin = {
  name: 'clean-validators',
  writeBundle() {
    try {
      rmSync('./dist/validators', { recursive: true, force: true });
    } catch (error) {
      console.error('Error cleaning validators directory:', error);
    }
  }
};

// Define entry points
const entryPoints = {
  index: 'src/index.ts'
};

// Create configuration for each entry point
const createConfig = (input, output, format, plugins, external = []) => ({
  input,
  output: {
    ...output,
    format,
    sourcemap: true,
    exports: 'named'
  },
  plugins,
  external
});

// Common plugins
const commonPlugins = [
  resolve({ browser: true }),
  typescript({
    tsconfig: './tsconfig.build.json'
  }),
  cleanValidatorsPlugin
];

// External dependencies
const external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];

// Generate configurations
const configs = [];

// Generate UMD, ESM, and browser builds for each entry point
Object.entries(entryPoints).forEach(([_, input]) => {
  // UMD build
  configs.push(
    createConfig(
      input,
      {
        name: 'globalIdValidator',
        file: pkg.main
      },
      'umd',
      [...commonPlugins, commonjs()]
    )
  );

  // ESM build
  configs.push(
    createConfig(
      input,
      { file: pkg.module },
      'es',
      commonPlugins,
      external
    )
  );

  // Browser build
  configs.push(
    createConfig(
      input,
      {
        name: 'globalIdValidator',
        file: 'dist/index.browser.min.js'
      },
      'iife',
      [...commonPlugins, commonjs(), terser()]
    )
  );
});

module.exports = configs; 