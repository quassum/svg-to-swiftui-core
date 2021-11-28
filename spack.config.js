const { config } = require('@swc/core/spack');

module.exports = config({
  entry: {
    'index.esm': 'src/index.ts',
  },
  output: {
    path: __dirname + '/build',
  },
  options: {
    minify: true,
  },
  target: 'browser',
});
