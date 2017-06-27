'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Web3 from 'web3';
var web3 = new Web3();
import truffleConfig from '../truffle.js'

var web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`

//need to sort provider!!!!

window.addEventListener('load', function() {
  // var web3Provided;
  // // if (typeof web3 !== 'undefined') {
  // //   console.log("what's going on");
  // //   web3Provided = new Web3(web3.currentProvider);
  // // } else {
  //   web3Provided = new Web3(new Web3.providers.HttpProvider(web3Location))
  // }
  web3.setProvider(new web3.providers.HttpProvider(web3Location));
  ReactDOM.render(<App web3 = {web3} />, document.getElementById('root'))
});
