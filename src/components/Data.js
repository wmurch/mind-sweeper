import React, { Component } from 'react'
import Cells from './Cells'

class Data extends Component {
  state = {
    games: [],
    status: '',
    id: '',
    difficulty: 0
  }
  componentDidMount() {
    fetch('https://minesweeper-api.herokuapp.com/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ difficulty: this.state.difficulty })
    }).then(response => {
      return response.json().then(game => {
        this.setState({ games: game.board, status: game.state, id: game.id })
        console.log({ game })
      })
    })
    //console.log({ games })
  }
  render() {
    return <>
    
    <Cells
 
    {this.state.games.}/>
    </> 
    
  }
}

export default Data
