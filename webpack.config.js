'use strict'

let path = require('path')
let webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: 'babel-loader',
      query: {
        "presets": ["react", "es2015", "stage-2"]
      }
    }, { test: /\.json$/, loader: 'json-loader' }]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
