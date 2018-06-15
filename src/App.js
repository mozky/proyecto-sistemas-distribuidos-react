import React, { Component } from 'react'
import Sockette from 'sockette'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  handleData(data) {
    console.log(data)
  }

  sendMessage = () => {
    console.log('openned!')
  }

  render() {
    const ws = new Sockette('ws://localhost:9001/echo', {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: e => console.log('Connected!', e),
      onmessage: e => console.log('Received:', e),
      onreconnect: e => console.log('Reconnecting...', e),
      onmaximum: e => console.log('Stop Attempting!', e),
      onclose: e => console.log('Closed!', e),
      onerror: e => console.log('Error:', e)
    })

    setTimeout(() => {ws.send('hola')}, 2000)

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
