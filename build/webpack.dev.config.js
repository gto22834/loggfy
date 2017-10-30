const path = require('path');
const Webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const config = require('./config/index');
const baseWebpackConfig = require('./webpack.base.config');

module.exports = webpackMerge(baseWebpackConfig, {
  devtool: 'cheap-module-source-map',
  entry: {
    PackConsole: [
      './src/index.js',
      'webpack/hot/only-dev-server',
      'webpack-dev-server/client?http://localhost:' + config.dev.port,
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, '../'),
    watchContentBase: true,
    compress: true,
    port: config.dev.port,
    hot: false,
    inline: true,
    historyApiFallback: true,
    publicPath: '/dist/',
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': process.env.NODE_ENV === 'production',
      },
    }),
    new Webpack.HotModuleReplacementPlugin(),
  ],
});
