import React, { Component } from 'react';

import './app.css';

class App extends Component {
  componentDidMount() {
    this._passport = require('passport');
    const auth = require('./../../auth/auth');
    auth(this._passport);
    this._passport.initialize();
    this._passport.session();
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