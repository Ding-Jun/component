const path    = require('path');
const env     = require('yargs').argv.mode;
const webpack = require('webpack');

const projectRoot = path.resolve(__dirname, '/');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const libraryName = 'nczl-mobile';

const plugins = [];
let outputFile;
const srcPath = path.join(__dirname, '/../src');
if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = `asserts/[name].min.js`;
} else {
  outputFile = `asserts/[name].js`;
}

const config = {
  entry:{
    index:'./src/js/home/index.js',
    search:'./src/js/search/index.js',
    article:'./src/js/article/index.js'
  },
  devtool: 'source-map',
  output: {
    path: `${__dirname}/dist`,
    srcPath:srcPath,
    publicPath: '/assets/',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    preLoaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /(node_modules|bower_components)/
      }
    ],
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  externals: {
    jquery: 'window.$'
  },
  plugins
};

module.exports = config;
