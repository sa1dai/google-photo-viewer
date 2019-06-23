import React, { Component } from 'react';

import './album.css';

const AlbumImg = ({ imgUrl }) => {

  const albumImgStyle = {
    backgroundImage: `url(${imgUrl})`
  };

  return (
    <div style={albumImgStyle} className="album-img"/>
  );
};

class Album extends Component {
  render() {
    const { album } = this.props;

    return (
      <div key={album.id} className="album">
        <AlbumImg imgUrl={album.coverPhotoBaseUrl} />
        <div>{album.title}</div>
        <div>{album.mediaItemsCount}</div>
      </div>
    )
  }
}

export default Album;