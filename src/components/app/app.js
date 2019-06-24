import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginPage from 'src/components/login-page'
import UserPage from 'src/components/user-page';
import config from 'src/config';

import './app.css';

class App extends Component {
  componentDidMount() {
    window.gapi.load('auth2', function() {
      window.gapi.auth2.init({
        client_id: config.oauthClientID,
      })
    });
  }

  render() {
    const { user } = this.props;

    return (
      <main role="main" className="main">
        {!user.isLoggedIn && <LoginPage />}
        {user.isLoggedIn && <UserPage user={user} />}
      </main>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, null)(App);