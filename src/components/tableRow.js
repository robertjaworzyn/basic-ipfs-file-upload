import React from 'react';
import {Table} from 'react-bootstrap';
// import ipfsAPI from 'ipfs-api';
//
// const ipfsApi = ipfsAPI('localhost', '5001');


// files should be downloaded from link!!!
class TableRow extends React.Component {
  constructor(props) {
    super(props);
  }

  // handleClick = (e) => {
  //   e.preventDefault();
  //   // ipfsAPI.get(this.props.hash, function (err, stream) {
  //   //   let files = []
  //   //   stream.pipe(through.obj((file, enc, next) => {
  //   //     file.content.pipe(concat((content) => {
  //   //       files.push({
  //   //         path: file.path,
  //   //         content: content
  //   //       })
  //   //       next();
  //   //     }))
  //   //   }))
  //   //   console.log(files[0].content);
  //   // })
  //   ipfsAPI.cat(this.props.hash, (err, res) => {
  //       if (err) throw err
  //       let data = ''
  //       res.on('data', (d) => {
  //         data = data + d
  //       })
  //       res.on('end', () => {
  //         console.log(data);
  //       })
  //     })
  // }

  render() {
    const downloadLink = 'https://ipfs.io/ipfs/' + this.props.hash;
    //console.log(downloadLink);
    return (
      <tr>
        <td>
          <a target="_blank"  href={downloadLink} download = "FILENAME">
            {this.props.name}
          </a>
        </td>
        <td>
          {this.props.hash}
        </td>
        <td>
          {this.props.desc}
        </td>
      </tr>
    );
  }
}

export default TableRow;
