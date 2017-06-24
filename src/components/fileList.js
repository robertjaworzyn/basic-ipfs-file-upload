import React from 'react';
import {Table} from 'react-bootstrap';
import TableRow from './tableRow';

class FileList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var hashList = this.props.files;
    var rows = [];
    if (hashList) {
      hashList = hashList.map((file, index) => {
        rows.push(
          <TableRow key = {index} name = {file.name} hash = {file.hash} desc = {file.desc} />
        );
      })
    }
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>File Name</th>
            <th>IPFS hash</th>
            <th>File Description</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    )
  }


}

export default FileList;
