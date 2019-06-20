import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import oauth2Config from 'src/oauth2-config';
import { userSignIn, userSignOut } from "src/actions";

import './app.css';

class App extends Component {
  componentDidMount() {
    window.gapi.load('auth2', function() {
      window.gapi.auth2.init({
        client_id: oauth2Config.clientID,
      })
    });
  }

  signIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();

    auth2.signIn().then(googleUser => {
      const profile = googleUser.getBasicProfile();

      this.props.userSignIn({
        name: profile.getName(),
        imageUrl: profile.getImageUrl(),
        token: googleUser.getAuthResponse().id_token
      });
    })
  };

  signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();

    auth2.signOut().then(() => {
      this.props.userSignOut();
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.signIn}>Log in</button>
          <button onClick={this.signOut}>Log out</button>
        </header>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    userSignIn: userSignIn,
    userSignOut: userSignOut
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);