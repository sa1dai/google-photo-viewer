import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
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
    this.props.history.push('/auth/google');
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

export default withRouter(App);