const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');
const path = require('path');

const config = require('./webpack.config');

config.output = {
  path: path.join('dist', pkg.version),
  filename: 'js/[name].[hash].js',
  publicPath: `/${pkg.name}/${pkg.version}/`
};

config.output.filename = `js/[name].[hash].js`;
config.devtool = 'source-map';

config.module.loaders.push({
  test: /\.s?css$/,
  loader: ExtractTextPlugin.extract('style', 'css?sourceMap&importLoaders=1!postcss')
});

config.module.loaders.push({
  test: /\.(woff2?|ttf|svg|eot)?(\?.+)?$/,
  loader: 'file?name=assets/[name].[ext]'
});

config.module.loaders.push({
  test: /\.(jpg|png|gif)?(\?.+)?$/,
  loader: 'file?name=img/[name].[hash].[ext]'
});

config.plugins.push(new ExtractTextPlugin('styles.[hash].css'));
config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
}));

module.exports = config;
