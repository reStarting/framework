const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FailPlugin = require('webpack-fail-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: [
          'json-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
      {
        test: /\.vue$/,
        loaders: [
          'vue-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'vue-template-loader',
        exclude: path.join(__dirname, 'src/index.html'),
        options: {
          // scoped: true,
          transformToRequire: {
            img: 'src'
          }
        }
      },
      {
        test: /\.(png|jpg|gif)/,
        loader: 'file-loader',
        options: {
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf|mov)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: 'icon/[name].[ext]?[hash]'
        }
      },
      {
        enforce: 'post',
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'postcss-loader'
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [
              // 'node_modules/breakpoint-sass/stylesheets',
              // 'node_modules/normalize-scss/sass'
              // 'node_modules/susy/sass'
            ]
          }
        }]
      },
      {
        enforce: 'post',
        test: /\.scss$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    FailPlugin,
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer({ remove: false, browsers: ['> 1%', 'last 3 versions', 'Firefox >= 20'/* , 'iOS >=7' */] })]
      },
      debug: true
    })
  ],
  devtool: 'source-map',
  output: {
    path: '.tmp',
    publicPath: '/',
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.scss'],
    alias: {
    }
  },
  externals: {
  },
  entry: [
    // 'webpack/hot/dev-server',
    // 'webpack-hot-middleware/client',
    `./src/index`
  ]
};