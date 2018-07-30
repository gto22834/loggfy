const path = require('path')
const MinifyCss = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const postcssImport = require('postcss-import')
const postcssPresetEnv = require('postcss-preset-env')

const env = process.env.NODE_ENV !== 'production'

module.exports = {
  plugins: [
    new MinifyCss({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: env ? '[name].css' : '[name].[hash].css',
      chunkFilename: env ? '[id].css' : '[id].[hash].css',
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(postc|sa|sc|c)ss$/,
        use: [
          /**
           *  mini-css-extract-plugin
           *  @see https://github.com/webpack-contrib/mini-css-extract-plugin
           *  style-loader (for hot-load)
           *  @see https://github.com/webpack-contrib/style-loader
           */
          env ? 'vue-style-loader' : MinifyCss.loader,
          // env ? 'style-loader' : MinifyCss.loader,
          /** @see https://github.com/webpack-contrib/css-loader */
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              alias: {
                '@img': path.resolve(__dirname, './src/assets/images'),
                '@font': path.resolve(__dirname, './src/assets/fontello'),
                '@css': path.resolve(__dirname, './src/assets/css'),
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                postcssImport({
                  root: loader.resourcePath,
                  path: [
                    path.join(process.cwd(), 'src'),
                    path.join(process.cwd(), 'src/assets/css'),
                  ],
                }),
                require('postcss-pxtorem')({
                  propList: ['*'],
                }),
                postcssPresetEnv({
                  stage: 0,
                  features: true,
                  browsers: 'last 2 versions',
                }),
                require('postcss-import')({ root: loader.resourcePath }),
              ],
            },
          },
        ],
      },
    ],
  },
}
