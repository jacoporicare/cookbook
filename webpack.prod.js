const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common');

const env = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: path.join(__dirname, 'dist/public'),
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(env)
      }
    })
  ]
});
