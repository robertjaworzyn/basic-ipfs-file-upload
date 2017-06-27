'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Web3 from 'web3';
var web3 = new Web3();
import truffleConfig from '../truffle.js'

var web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`

window.addEventListener('load', function() {
  web3.setProvider(new web3.providers.HttpProvider(web3Location));
  ReactDOM.render(<App web3 = {web3} />, document.getElementById('root'))
});
