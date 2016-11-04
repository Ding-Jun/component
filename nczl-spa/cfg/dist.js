'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
let publicPath=baseConfig.output.publicPath;
let config = Object.assign({}, baseConfig, {
  entry: {
    app:path.join(__dirname, '../src/index'),
    vendor: ['react','react-dom','react-router','redux','redux-thunk','react-redux','react-router-redux']//提取部分lib
  },
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].[chunkhash:8].js',        //真正生產使用
    //filename: '[name].js',
    publicPath: publicPath
  },
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']//manifest没用但不能去掉 http://www.cnblogs.com/myqianlan/p/5626505.html
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,  // remove all comments
      },
      compress:{
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
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
