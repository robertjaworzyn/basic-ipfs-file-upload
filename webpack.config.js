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
      loaders: ['react-hot-loader','babel-loader']
    },
    {
        test: /\.json$/,
        loader: 'json-loader'
    },
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
    },
    {
        test: /\.sol$/,
        loader: 'truffle-solidity-loader'
    }]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
