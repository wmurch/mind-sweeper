import React, { Component } from 'react'

class Data extends Component {
  state = {
    games: []
  }
  componentDidMount() {
    fetch('https://minesweeper-api.herokuapp.com/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ difficulty: 1 })
    }).then(response => {
      return response.json().then(game => {
        console.log({ game })
        this.setState({ games: { game } })
      })
    })
  }
  //console.log({ games })
  render() {
    return <h1>Hello, World!</h1>
  }
}

export default Data
