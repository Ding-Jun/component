'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');
let publicPath=defaultSettings.publicPath;

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: {
    home:'./src/js/home/index',
    article:'./src/js/article/index',
    search:'./src/js/search/index'
  },
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    //filename: '[name].[chunkhash:6].js',        //真正生產使用
    filename: '[name].js',
    publicPath: publicPath
  },
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    //new webpack.optimize.CommonsChunkPlugin('common.[chunkhash:6].js'),   //真正生產使用
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
