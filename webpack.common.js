const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    'polyfills': './src/client/polyfills.js',
    'vendor': './src/client/vendor.js',
    'app': './src/client/index.js'
  },

  resolve: {
    extension: ['', '.js', '.jsx']
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', [
        'css?sourceMap',
        'postcss',
        'sass?sourceMap'
      ])
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', [
        'css?sourceMap',
        'postcss'
      ])
    }, {
      test: /\.(png|jpe?g|gif|ico|woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000'
    }]
  },

  postcss: [autoprefixer({
    browsers: ['last 3 versions']
  })],

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: './src/client/index.html'
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
};
