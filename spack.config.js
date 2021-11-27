const {config} = require('@swc/core/spack');

module.exports = config({
  entry: 'src/index.ts',
  output: {
    path: __dirname + '/build',
    name: 'index.esm.js',
  },
  options: {
    minify: true,
  },
  target: 'browser',
});
