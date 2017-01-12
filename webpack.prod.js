const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: path.join(__dirname, 'dist/public'),
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js',
    publicPath: '/'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
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
        windows: false
      }
    })
  ]
});
