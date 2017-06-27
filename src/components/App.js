'use strict'
import React from 'react';
import ipfsAPI from 'ipfs-api';
import {Button} from 'react-bootstrap'

import MetaCoin from '../../contracts/MetaCoin.sol';
import FileList from './fileList';
import * as api from '../api';
require("./css/index.css")

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      fileData: [],
      accounts: [],
      coinbase: ''
    };
    this.ipfsApi = ipfsAPI('localhost', '5001');
  }

  componentWillMount = () => {
    MetaCoin.setProvider(this.props.web3.currentProvider);
  }

  componentDidMount = () => {
    this.fetchFiles();
    const refreshBalances = () => {
      this._getAccountBalances();
    }

    refreshBalances();

    // setInterval(()=>{
    //   refreshBalances();
    //   return refreshBalances
    // }, 5000)
  }

  fetchFiles = () => {
    api.fetchFiles().then(newFiles => {
      this.setState({
        fileData: newFiles
      })
    })
  }

  saveToIpfs = (reader, name, desc) => {
    let ipfsId;
    const buffer = Buffer.from(reader.result);
    this.ipfsApi.add(buffer)
    .then((response) => {
      const hashes = this.state.fileData;
      api.saveFile(name, response[0].hash, desc)
        .then(resp => console.log(resp));
      hashes.push({
        name: name,
        hash: response[0].hash,
        desc: desc
      });
      this.setState({
        fileData: hashes
      });
    }).catch((err) => {
      console.error(err)
    })
  }

  _getAccountBalance = (account) => {
   var meta = MetaCoin.deployed();
   return new Promise((resolve, reject) => {
     meta.getBalance.call(account, {from: account}).then((value) => {
       resolve({ account: value.valueOf() })
     }).catch((e) => {
       console.log(e);
       reject();
     })
   })
 }

  _getAccountBalances = () => {
     this.props.web3.eth.getAccounts((err, accs) => {
       if (err != null) {
         window.alert('There was an error fetching your accounts.');
         console.error(err);
         return;
       }

       if (accs.length === 0) {
         window.alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
         return;
       }

       this.setState({coinbase: accs[0]});

       var accountsAndBalances = accs.map((account) => {
         return this._getAccountBalance(account).then((balance) => { return { account, balance } });
       })

       Promise.all(accountsAndBalances).then((accountsAndBalances) => {
         this.setState({accounts: accountsAndBalances, coinbase: accountsAndBalances[0]})
       });
     });

  }

  handleSubmit = (event) => {
    event.preventDefault();
    const files = this.filesInput.files;
    const name = files[0].name;
    const desc = this.refs.description.value;
    let reader = new window.FileReader();
    reader.onloadend = () =>
        this.saveToIpfs(reader, name, desc);
    reader.readAsArrayBuffer(files[0]);
    this.refs.description.value = "";

  }

  render () {
    return (
      <div id = "wrapper">
        <h1>Hey buddy, upload ya file would ya?!?!</h1>
        <br/>
        <form id="captureMedia" onSubmit={this.handleSubmit}>
          <input
            type="file"
            ref={(input) => { this.filesInput = input; }}
            className = "file"
            required />
          <br/><br/>
          <textarea ref = "description"
            label ="Description: " placeholder = "Describe yo file.."
            rows = "5" cols = "50" required/>
          <br/><br/>
          <Button bsStyle="primary" type = "submit"> SUBMIT</Button>
        </form>
        <br/>
        <h2>Here are your files: </h2><br/>
        <div>
          <FileList files = {this.state.fileData} />
        </div>
      </div>
    );
  }
}

export default App;
