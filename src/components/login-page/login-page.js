import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { userSignIn } from "src/actions";
import config from 'src/config';

import './login-page.css';

class LoginPage extends Component {

  signIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();

    auth2.signIn({ scope: config.oauthScopes })
      .then(googleUser => {
        const profile = googleUser.getBasicProfile();

        this.props.userSignIn({
          name: profile.getName(),
          imageUrl: profile.getImageUrl(),
          token: googleUser.getAuthResponse().access_token
      });
    });
  };

  render() {
    return (
      <div className="login-page d-flex">
        <button onClick={this.signIn} className="btn btn-primary connect-button">Connect to Google Photos</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    userSignIn: userSignIn
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(LoginPage);