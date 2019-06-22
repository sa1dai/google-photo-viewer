import React, { Component } from 'react';

import './album-list.css';

class AlbumListContainer extends Component {

  render() {
    const { albums } = this.props;

    return (
      <span>Album list</span>
    );

    /*return (
      <React.Fragment>
        {
          albums.map(album => {
            return (
              <div key={album.id}>
                {album.title}
              </div>
            );
          })
        }
      </React.Fragment>
    )*/
  }
}

export default AlbumListContainer;