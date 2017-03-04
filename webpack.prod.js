const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: path.join(__dirname, 'dist/public'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },

  plugins: [
    new WebpackMd5Hash(),

    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
    }),

    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
    }),

    new FaviconsWebpackPlugin({
      logo: './src/client/piggy.png',
      title: 'Žrádelník',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
  ],
});
