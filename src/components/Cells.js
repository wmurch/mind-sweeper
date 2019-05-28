import React, { Component } from 'react'

class Cells extends Component {
  render() {
    return (
      <main>
        <h1 className="gameTitle">Bomb Sniffer</h1>
        <table>
          <tbody>
            {this.props.games.map((row,i)=>(<tr loc={i}>
              {row.map((column, a => (<td
              loc={a}
              className={this.operateCell(this.props.games[i][a])}
              onClick={()=>}
              
              ></td>)))}
            </tr>))}
          </tbody>
        </table>
      </main>
    )
  }
}
export default Cells
