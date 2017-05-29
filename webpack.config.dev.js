const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.config.common');

module.exports = webpackMerge(commonConfig, {
  devtool: 'eval-source-map',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'http://localhost:4000/',
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: true,
    }),
  ],

  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:4001',
    },
  },
});
