import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Inject } from './store'

// @Inject()  // It's Best.
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Count: {this.props.count}
          </p>
          <div>
            <button onClick={() => this.props.increment()}>increment</button>
            <button onClick={() => this.props.decrement()}>decrement</button>
            <button onClick={() => this.props.asyncIncrement()}>asyncIncrement</button>
          </div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default Inject('counter')(App);
