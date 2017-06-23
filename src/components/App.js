'use strict'
import React from 'react';
import ipfsAPI from 'ipfs-api';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      added_file_hash: null
    };
    this.ipfsApi = ipfsAPI('localhost', '5001');
  }

  captureFile = (file) => {
    // event.stopPropagation();
    // event.preventDefault();
    // const file = event.target.files[0];
    //console.log(formData);
    let reader = new window.FileReader();
    reader.onloadend = () => this.saveToIpfs(reader);
    reader.readAsArrayBuffer(file);
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
    this.captureFile(files[0]);

  }

  render () {
    return (
      <div>
        <h1>Hey buddy, upload ya file would ya?!?!</h1>
        <form id="captureMedia" onSubmit={this.handleSubmit}>
          <input
            type="file"
            ref={(input) => { this.filesInput = input; }}
            name = "file"
            required />
          <br/>
          <textarea ref = "description"
            label ="Description: " placeholder = "Describe yo file.." required/>
          <br/>
          <button type = "submit">SUBMIT</button>
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
