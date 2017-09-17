const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.config.common');

const { PORT = 4000, API_URL = 'http://localhost:4001' } = process.env;

module.exports = webpackMerge(commonConfig, {
  devtool: 'eval-source-map',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
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
    hot: true,
    overlay: true,
    port: PORT,
    proxy: {
      '/api': API_URL,
    },
    stats: 'errors-only',
  },
});
