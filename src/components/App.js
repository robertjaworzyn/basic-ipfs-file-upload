'use strict'
import React from 'react';
import ipfsAPI from 'ipfs-api';

require("./css/index.css")

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      added_file_hash: null
    };
    this.ipfsApi = ipfsAPI('localhost', '5001');
  }

  saveToIpfs = (reader) => {
    let ipfsId;
    const buffer = Buffer.from(reader.result);
    this.ipfsApi.add(buffer)
    .then((response) => {
      console.log(response)
      ipfsId = response[0].hash
      console.log(ipfsId)
      this.setState({added_file_hash: ipfsId})
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
    return (
      <div id = "wrapper">
        <h1>Hey buddy, upload ya file would ya?!?!</h1>
        <br/><br/>
        <form id="captureMedia" onSubmit={this.handleSubmit}>
          <input
            type="file"
            ref={(input) => { this.filesInput = input; }}
            className = "file"
            required />
          <br/>
          <textarea ref = "description"
            label ="Description: " placeholder = "Describe yo file.."
            rows = "5" cols = "50" required/>
          <br/><br/>
          <button className = "butt" type = "submit">SUBMIT</button>
        </form>
        <div>
          <a target="_blank"
            href={'https://ipfs.io/ipfs/' + this.state.added_file_hash}>
            {this.state.added_file_hash}
          </a>
        </div>
      </div>
    )
  }
}

export default App;
