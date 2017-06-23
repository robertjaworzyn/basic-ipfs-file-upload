'use strict'
import React from 'react';
import ipfsAPI from 'ipfs-api';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';
// import FileCloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import {Button} from 'react-bootstrap'

import * as api from '../api';
require("./css/index.css")

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fileHashes: []
    };
    this.ipfsApi = ipfsAPI('localhost', '5001');
  }

  saveToIpfs = (reader) => {
    let ipfsId;
    const buffer = Buffer.from(reader.result);
    this.ipfsApi.add(buffer)
    .then((response) => {
      const hashes = this.state.fileHashes;
      hashes.push(response[0].hash);
      this.setState({
        fileHashes: hashes
      });
    }).catch((err) => {
      console.error(err)
    })
  }

  // arrayBufferToString = (arrayBuffer) => {
  //   return String.fromCharCode.apply(null, new Uint16Array(arrayBuffer))
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    const files = this.filesInput.files;
    let reader = new window.FileReader();
    reader.onloadend = () => this.saveToIpfs(reader);
    reader.readAsArrayBuffer(files[0]);
    this.refs.description.value = "";

  }

  render () {
    var hashList = this.state.fileHashes;
    if (hashList) {
      hashList = hashList.map((hash, index) => {
        return (
          <li><a target="_blank"
            href={'https://ipfs.io/ipfs/' + hash}>
            {hash}
          </a>
          </li>
        );
      })
    }
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
        <div>
        <ul>
          {hashList}
        </ul>
        </div>
      </div>
    );
  }
}

export default App;
