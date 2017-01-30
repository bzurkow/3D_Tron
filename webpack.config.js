'use strict';

const webpack = require('webpack');

module.exports = {
  entry: './browser/main.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      }
    ]
  },
  plugins: [
  new webpack.NormalModuleReplacementPlugin(
    /inline\-worker/,
    'webworkify-webpack'
  )]
};
