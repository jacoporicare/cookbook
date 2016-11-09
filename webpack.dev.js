const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
  devtool: 'inline-source-map',
  debug: true,
  noInfo: false,

  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});
