const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rucksack = require('rucksack-css');
const _ = require('lodash');
const pkg = require('./package.json');

module.exports = {
  entry: {
    app: [
      './'
    ],
    vendors: [
      'babel-polyfill',
      ...Object.keys(pkg.dependencies).filter(x => x !== 'bootstrap')
    ]
  },

  output: {
    path: resolve('./dist'),
    filename: 'js/[name].js',
    //publicPath: `/`
  },

  context: resolve(__dirname, 'src'),

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              configFile: './.eslintrc',
              failOnError: false,
              cache: true
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader?sourceMap&importLoaders=1' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('postcss-import')(),
                  require('postcss-mixins')(),
                  require('postcss-simple-vars')(),
                  require('postcss-nested')(),

                  rucksack({
                    autoprefixer: true
                  })
                ]
              }
            }

          }
        ]
      },
      {
        test: /\.(woff2?|ttf|svg|eot|jpg|png|gif)?(\?.+)?$/,
        use: 'url-loader'
      },
      { test: /\.html$/, loader: 'html-loader' }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: Infinity
    }),

    new HtmlWebpackPlugin({
      title: _.startCase(pkg.name),
      chunks: ['vendors', 'app'],
      filename: 'index.html',
      template: 'index.ejs'
    })
  ],
};
