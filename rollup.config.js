var babel = require('rollup-plugin-babel');
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');
var multiEntry = require('rollup-plugin-multi-entry');
var Elixir = require('laravel-elixir');
var replace = require('rollup-plugin-replace');

module.exports = {
  plugins: [
    nodeResolve({ browser: true, main: true, jsnext: true }),
    commonjs({
      include: [
        'node_modules/**',
        'resources/assets/js/**'
      ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(Elixir.inProduction)
    }),
    babel(),
    multiEntry()
  ]
};
