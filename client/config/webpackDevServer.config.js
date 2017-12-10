const { API_URL } = process.env;

module.exports = {
  clientLogLevel: 'none',
  compress: true,
  historyApiFallback: true,
  hot: true,
  overlay: true,
  proxy: {
    '/api': API_URL,
  },
  quiet: true,
  stats: 'errors-only',
  watchOptions: {
    ignored: /node_modules/,
  },
};
