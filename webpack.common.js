const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    'polyfills': './client/polyfills.jsx',
    'vendor': './client/vendor.jsx',
    'app': './client/app.jsx'
  },

  resolve: {
    extension: ['', '.js', '.jsx']
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', [
        'css-loader?sourceMap',
        'postcss-loader',
        'sass-loader?sourceMap'
      ])
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', [
        'css-loader?sourceMap',
        'postcss-loader'
      ])
    }, {
      test: /\.(png|jpe?g|gif|ico|woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000'
    }]
  },

  postcss: [autoprefixer({
    browsers: ['last 3 versions']
  })],

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),

    new FaviconsWebpackPlugin({
      logo: './client/piggy.png',
      title: 'Žrádelník',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
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
