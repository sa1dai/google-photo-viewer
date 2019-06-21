import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { userSignIn } from "src/actions";

import './login-page.css';

class LoginPage extends Component {

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

  render() {
    return (
      <button onClick={this.signIn} className="btn btn-primary connect-button">Connect to Google Photos</button>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    userSignIn: userSignIn
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(LoginPage);