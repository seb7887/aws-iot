const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const parts = require('./build-utils/webpack.parts');
const { PATHS } = require('./build-utils/paths');

const commonConfig = merge([
  parts.loadTypescript({ include: PATHS.entry, exclude: /node_modules/ })
]);

module.exports = ({ mode }) => {
  const modeConfig = require(`./build-utils/webpack.${mode}.js`);
  return merge(
    {
      mode,
      entry: ['./src/index.tsx'],
      output: {
        path: PATHS.output,
        chunkFilename: '[name].[chunkhash:4].js',
        filename: '[name].[chunkhash:4].bundle.js'
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: PATHS.html
        })
      ]
    },
    commonConfig,
    modeConfig
  );
};
