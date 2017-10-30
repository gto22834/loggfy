const path = require('path');
// some config omitted here
const config = require('./config/index');

// const extractLess = new ExtractTextPlugin({
//   filename: '[name].css',
//   disable: process.env.NODE_ENV === 'development',
// });

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: require.resolve('../src/index.js'),
        use: [
          {
            loader: 'expose-loader',
            options: 'PackConsole',
          },
        ],
      },
      /**
       * eslint loader for js
       * https://github.com/MoOx/eslint-loader
       * @type {String}
       */
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [/node_modules/, /test/],
        loader: 'eslint-loader',
        // options: {
        //   fix: true,
        //   emitError: true,
        // },
      },
      /**
       * babel loader for js
       * https://github.com/babel/babel-loader
       * @type {RegExp}
       */
      {
        test: /\.js?$/,
        exclude: [/node_modules/],
        loader: 'babel-loader', // 由於有設定 .babelrc 所以不需要額外用 options
      },
      // https://github.com/webpack-contrib/less-loader
      // {
      //   test: /\.(css|less|scss)$/,
      //   use: extractLess.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       {
      //         loader: 'css-loader',
      //       },
      //       {
      //         loader: 'postcss-loader',
      //         options: {
      //           plugins: function (loader) {
      //             return [
      //               require('precss'),
      //               require('autoprefixer'),
      //             ];
      //           },
      //         },
      //       },
      //       {
      //         loader: 'less-loader',
      //       },
      //     ],
      //     // publicPath: '../../../',
      //   }),
      // },
      {
        test: /(css\\img\\|css\\font\\|css\/img\/|css\/font\/).*\.(gif|jpg|png|woff|woff2|svg|eot|ttf)\??.*$/,
        use: 'url-loader?context=./src&limit=1&name=[path][name]-[hash:8].[ext]',
      },
    ],
  },
};
