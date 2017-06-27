'use strict'
import React from 'react';
import ipfsAPI from 'ipfs-api';
import {Button} from 'react-bootstrap'

import Storage from '../../contracts/Storage.sol';
import FileList from './fileList';
import * as api from '../api';
require("./css/index.css")

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fileData: [],
      accounts: [],
      account: '',
      coinbase: ''
    };
    this.ipfsApi = ipfsAPI('localhost', '5001');
  }

  componentWillMount = () => {
    Storage.setProvider(this.props.web3.currentProvider);
  }

  componentDidMount = () => {
    this.fetchFiles();
    console.log(this.state.fileData);
    this.getAccount();
  }

  fetchFiles = () => {
    api.fetchFiles().then(newFiles => {
      this.setState({
        fileData: newFiles
      })
    })
  }

  saveToIpfs = (reader, name, desc, account) => {
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

      console.log("Yo, this is the account we sending from: " + this.state.account);
      var store = Storage.deployed();
      store.set(response[0].hash, {from: this.state.account}).then((result) => {
        console.log('Successfully sent data. Transaction hash: ', result);
      })
    }).catch((err) => {
      console.error(err)
    })
  }

  getAccount = () => {
    var acc;
    this.props.web3.eth.getAccounts((err, accs) => {
      console.log(accs);
      if (err != null) {
        window.alert('There was an error fetching your accounts.');
        console.error(err);
        return;
      }

      if (accs.length === 0) {
        window.alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      this.setState({
        account: accs[0]
      })

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
