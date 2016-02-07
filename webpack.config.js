/**
 * Created by Craig on 05/02/2016.
 */

var path = require('path');

module.exports = {
  entry: './app/main.js',
  output: {
    filename: path.join(__dirname, 'app/bundle.js')
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ]
  }
};
