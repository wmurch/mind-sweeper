import React, { Component } from 'react'

class Cells extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.cell} </td>
      </tr>
    )
  }
}

export default Cells
