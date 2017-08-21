const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.config.common');

const { PORT, API_URL } = process.env;

module.exports = webpackMerge(commonConfig, {
  devtool: 'eval-source-map',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: true,
    }),
  ],

  devServer: {
    compress: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    overlay: true,
    port: PORT,
    proxy: {
      '/api': API_URL,
    },
    stats: 'errors-only',
  },
});
