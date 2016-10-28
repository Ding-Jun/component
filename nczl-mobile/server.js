/**
 * Created by admin on 2016/10/28.
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
const open = require('open');
console.log("pppp"+ config.output.publicPath);
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  proxy: {
    '/nczl-web/*': {
      target: 'http://192.168.51.177:8090',
      secure: false
    }
  },
  contentBase: "./dist",
  noInfo: false,
  historyApiFallback: true
}).listen(3000, '127.0.0.1', function (err, result) {
  if (err) {
    console.log(err);
  }
  open('http://localhost:' + 3000);
});
