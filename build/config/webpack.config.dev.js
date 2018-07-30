'use strict'

// Silence webpack2 deprecation warnings
// https://github.com/vuejs/vue-loader/issues/666
process.noDeprecation = true

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// Base
const webpackBaseConfig = require('./webpack.config.base.js')

// Paths to be used for webpack configuration
const paths = {
  appSrc: path.join(process.cwd(), 'src'),
  appIndex: path.join(process.cwd(), 'src', 'main.js'),
  appBuild: path.join(process.cwd(), 'dist'),
  public: '/',
  templateHtml: path.join(process.cwd(), 'public', 'index.html'),
}

const webpackConfig = merge(webpackBaseConfig, {
  mode: 'development',
  entry: {
    main: [
      // Include an alternative client for WebpackDevServer. A client's job is to
      // connect to WebpackDevServer by a socket and get notified about changes.
      // When you save a file, the client will either apply hot updates (in case
      // of CSS changes), or refresh the page (in case of JS changes). When you
      // make a syntax error, this client will display a syntax error overlay.
      // Note: instead of the default WebpackDevServer client, we use a custom one
      // to bring better experience from Create React App users. You can replace
      // the line below with these two lines if you prefer the stock client:
      // require.resolve('webpack-dev-server/client') + '?/',
      // require.resolve('webpack/hot/dev-server'),
      // NOTE: Use 'webpack/hot/dev-server' to avoid `sockjs-node/info?t=1486292316677 404 Error`
      require.resolve('webpack/hot/dev-server'),
      // require.resolve('react-dev-utils/webpackHotDevClient'),
      // Your app's code
      paths.appIndex,
    ],
  },
  output: {
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'static/js/bundle.js',
    // Not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    // The URL that app is served from. We use "/" in development.
    publicPath: paths.public,
  },
  // module: {
  //   rules: [
  //     {
  //       enforce: 'pre',
  //       test: /\.(js|vue)$/,
  //       loader: 'eslint-loader',
  //       include: [/src/],
  //       options: {
  //         fix: true,
  //         emitError: true,
  //       },
  //     },
  //   ],
  // },
  plugins: [
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: paths.templateHtml,
      inject: true,
      hash: true,
    }),
  ],
  devtool: 'inline-source-map',
})

module.exports = webpackConfig
