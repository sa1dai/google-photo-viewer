import React, { Component } from 'react';
import {bindActionCreators, compose} from 'redux';
import { connect } from 'react-redux';

import {fetchAlbums, userSignOut} from "src/actions";

import './user-page.css';
import withService from "src/hoc/with-service";
import Spinner from "src/components/spinner";
import AlbumList from "src/components/album-list";

class UserPage extends Component {

  componentDidMount() {
    const { token } = this.props.user;

    this.props.fetchAlbums(token);
  }

  signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();

    auth2.signOut().then(() => {
      this.props.userSignOut();
    });
  };

  render() {
    const { user, albumListAsync: { loading: albumsLoading, albums }, albumAsync: { loading: albumLoading } } = this.props;

    return (
      <React.Fragment>
        <header className="header">
          <span className="logo-text">Google Photos Viewer</span>
          <div className="auth-block">
            <img src={user.imageUrl} alt="user logo" className="user-img"/>
            <span className="user-name">{user.name}</span>
            <button onClick={this.signOut} className="btn btn-secondary mx-auto">Disconnect</button>
          </div>
        </header>
        { (albumsLoading || albumLoading) && <Spinner /> }
        { !(albumsLoading || albumLoading) &&  <AlbumList albums={albums} url={'#'} author={'maxim'} perPage={3} /> }
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ user, albumListAsync, albumAsync }) => {
  return { user, albumListAsync, albumAsync };
};

const mapDispatchToProps = (dispatch, { service }) => {
  return bindActionCreators({
    userSignOut: userSignOut,
    fetchAlbums: fetchAlbums(service)
  }, dispatch);
};

export default compose(
  withService(),
  connect(mapStateToProps, mapDispatchToProps)
)(UserPage);