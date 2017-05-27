const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    vendor: './src/client/vendor.js',
    app: './src/client/index.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
          ],
        }),
      },
      {
        test: /\.(png|jpe?g|gif|ico|woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000',
      },
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
      },
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),

    new HtmlWebpackPlugin({
      template: './src/client/index.html',
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};
