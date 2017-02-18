const path = require('path');
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
    path: path.resolve('./dist'),
    //publicPath: `/`
  },

  context: path.resolve(__dirname, 'src'),

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.html$/, loader: 'html' },
      { test: /\.json$/, loader: 'json' }
    ],

    noParse: []
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {}
  },

  postcss: [
    require('postcss-import')(),
    require('postcss-mixins')(),
    require('postcss-simple-vars')(),
    require('postcss-nested')(),

    rucksack({
      autoprefixer: true
    })
  ],

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
