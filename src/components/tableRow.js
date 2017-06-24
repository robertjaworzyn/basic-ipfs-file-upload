import React from 'react';
import {Table} from 'react-bootstrap';

class TableRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>
          <a target="_blank"
            href={'https://ipfs.io/ipfs/' + this.props.hash}>
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
