import React, { Component } from 'react';
import './App.css';
import Platforms from './components/Platforms';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> DECAP Database Editor </h1>
        </header>

        <Platforms />
      </div>
    );
  }
}

export default App;
