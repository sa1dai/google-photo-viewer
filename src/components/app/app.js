import React, { Component } from 'react';

import './app.css';

class App extends Component {
  componentDidMount() {

  }

  onLogin = () => {

  };

  render() {
    return (
      <button
        className="btn btn-primary"
        onClick={this.onLogin}
      >
        Login google photos
      </button>
    );
  }
}

export default App;