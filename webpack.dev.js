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
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: 'http://localhost:3001/'
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css', {
      disable: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true
    })
  ],

  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});
