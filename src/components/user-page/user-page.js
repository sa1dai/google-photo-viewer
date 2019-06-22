import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { userSignOut } from "src/actions";

import './user-page.css';

class UserPage extends Component {

  componentDidMount() {

  }

  signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();

    auth2.signOut().then(() => {
      this.props.userSignOut();
    });
  };

  render() {
    const { user } = this.props;

    return (
        <header className="header">
          <span className="logo-text">Google Photos Viewer</span>
          <div className="auth-block">
            <img src={user.imageUrl} alt="user logo" className="user-img"/>
            <span className="user-name">{user.name}</span>
            <button onClick={this.signOut} className="btn btn-secondary mx-auto">Disconnect</button>
          </div>
        </header>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    userSignOut: userSignOut
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);