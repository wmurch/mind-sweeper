import React, { Component } from 'react'
//import Cells from './Cells'

class Data extends Component {
  //set state
  state = {
    games: [],
    status: '',
    id: '',
    difficulty: 0
  }
  componentDidMount() {
    // pull data from minesweeper api
    fetch(`https://minesweeper-api.herokuapp.com/games/${this.state.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ difficulty: this.state.difficulty })
    }).then(response => {
      return response.json().then(game => {
        this.setState({ games: game.board, status: game.state, id: game.id })
        // console.log({ game })
      })
    })
    //console.log({ games })
  }

  //left click
  leftClick = (row, col) => {
    fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
      {
        method: 'POST',
        body: JSON.stringify({
          row: row,
          col: col
        }),
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then(response => response.json())
      .then(updateGame => {
        this.setState({
          board: updateGame.board,
          status: updateGame.state,
          id: updateGame.id
        })
        console.log({ updateGame })
      })
  }
  flagCell = (row, col) => {
    fetch(`https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`, {
      method: 'POST',
      body: JSON.stringify({
        row: row,
        col: col
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())

      .then(updateGame => {
        this.setState({
          board: updateGame.board,
          status: updateGame.state,
          id: updateGame.id
        })
      })
  }
  operateCell = cell => {
    let cellValue = 'tdCell'
    if (this.state.difficulty === 0) {
      cellValue += 'big'
    } else if (this.state.difficulty === 1) {
      cellValue += 'medium'
    } else {
      cellValue += 'small'
    }
    if (cell === '_') {
      cellValue += 'reveal'
      return 'tdCell reveal'
    } else if (cell === 'F') {
      cellValue += 'flag'
    } else if (cell === '*') {
      cellValue += 'bomb'
    } else if (cell === '@') {
      cellValue += 'cellFlagBomb'
    } else if (+cell >= 1 && +cell <= 8) {
      cellValue += 'number'
    }
    return cellValue
  }
  //set difficulty
  setDifficulty = event => {
    //console.log(event.target.value)
    this.setState(
      {
        difficulty: +event.target.value
      },
      () => {
        fetch('https://minesweeper-api.herokuapp.com/games', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ difficulty: +this.state.difficulty })
        }).then(response => {
          return response.json().then(game => {
            this.setState({
              games: game.board,
              status: game.state,
              id: game.id
            })
            //  console.log({ game })
          })
        })
      }
    )
  }
  //flag certain buttons
  // reset game
  //right
  render() {
    //console.log('State: ', this.state)
    return (
      <main>
        <h1 className="gameTitle">Bomb Sniffer</h1>
        <label>choose difficulty</label>
        <select onChange={this.setDifficulty}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <table>
          <tbody>
            {this.state.games.map((row, i) => (
              <tr key={i}>
                {row.map((column, a) => (
                  <td
                    key={a}
                    className={this.operateCell(this.state.games[i][a])}
                    onClick={() => this.leftClick(i, a)}
                    onContextMenu={() => this.flagCell(i, a)}
                  >
                    {this.state.games[i][a]}
                    {console.log(this.state.games[i][a])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    )
  }
}

export default Data
