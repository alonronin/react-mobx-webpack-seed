const config = require('./webpack.config');
const webpack = require('webpack');

config.output.filename = 'js/[name].js';

config.module.loaders.push({
  test: /\.s?css$/,
  loaders: ['style', 'css?sourceMap&importLoaders=1', 'postcss']
});


config.module.loaders.push({
  test: /\.(woff2?|ttf|svg|eot)?(\?.+)?$/,
  loader: 'url'
});

config.module.loaders.push({
  test: /\.(jpg|png|gif)?(\?.+)?$/,
  loader: 'url'
});

config.module.loaders.push({
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
});

const babelLoader = config.module.loaders.find(o => o.loader === 'babel');
babelLoader.query = {presets: ['react-hmre']};

config.eslint = {
  configFile: './.eslintrc',
  failOnError: true,
  cache: true
};

if (process.env.autofix) {
  config.eslint.fix = true;
}

module.exports = config;
