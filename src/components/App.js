'use strict'
import React from 'react';
import ipfsAPI from 'ipfs-api';
import {Button} from 'react-bootstrap'

import * as api from '../api';
require("./css/index.css")

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fileData: []
    };
    this.ipfsApi = ipfsAPI('localhost', '5001');
  }

  componentDidMount = () => {
    this.fetchFiles();
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
    var hashList = this.state.fileData;
    if (hashList) {
      hashList = hashList.map((file, index) => {
        return (
          <li><a target="_blank"
            href={'https://ipfs.io/ipfs/' + file.hash}>
            {file.name}
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
