const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const pkg = require('./package.json');
const terser = require('@rollup/plugin-terser');

module.exports = [
  // UMD build (for browsers and Node.js)
  {
    input: 'src/index.ts',
    output: {
      name: 'globalIdValidator',
      file: pkg.main,
      format: 'umd',
      sourcemap: true,
      exports: 'named'
    },
    plugins: [
      resolve({
        browser: true
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          target: 'es2019'
        }
      })
    ]
  },
  // ESM build (for modern bundlers)
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      exports: 'named'
    },
    plugins: [
      resolve({
        browser: true
      }),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          target: 'es2019'
        }
      })
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]
  },
  // Browser-specific minified build
  {
    input: 'src/index.ts',
    output: {
      name: 'globalIdValidator',
      file: 'dist/index.browser.min.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      resolve({
        browser: true
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          target: 'es2019'
        }
      }),
      terser() // Minify the browser bundle
    ]
  }
]; 