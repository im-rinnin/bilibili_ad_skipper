const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './content.js',
  output: {
    filename: 'content.bundle.js',
    path: path.resolve(__dirname),
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {},
    },
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  resolve: {
    fallback: {
      "crypto": false,
      "stream": false,
      "assert": false,
      "http": false,
      "https": false,
      "os": false,
      "url": false,
    },
  },
};