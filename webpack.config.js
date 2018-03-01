const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const { paths } = require('./config');

module.exports = {
  // mode: 'production', //'development',
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre'
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: [
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
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              autoprefixer({
                remove: false,
                browsers: ['> 1%', 'Firefox >= 20', 'ie > 8'/* , 'iOS >=7' */]
              })
            ]
          }
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
    new CleanWebpackPlugin([paths.dist, paths.tmp]),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  output: {
    path: path.join(__dirname, paths.dist),
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
    './src/index'
  ]
};
