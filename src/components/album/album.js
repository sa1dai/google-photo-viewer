import React, { Component } from 'react';

import './album.css';
import ImgsViewer from "react-images-viewer";

const AlbumImg = ({ imgUrl }) => {

  const albumImgStyle = {
    backgroundImage: `url(${imgUrl})`
  };

  return (
    <div style={albumImgStyle} className="album-img"/>
  );
};

class Album extends Component {

  componentWillMount() {
    this.setState({
      isOpen: false,
      currImg: 0,
    });
  }

  openImgsViewer = (index, event) => {
    event.preventDefault();

    this.setState({
      currImg: index,
      isOpen: true,
    });
  };

  closeImgsViewer = () => {
    this.setState({
      currImg: 0,
      isOpen: false,
    });
  };

  gotoPrev = () => {
    this.setState({
      currImg: this.state.currImg - 1
    });
  };

  gotoNext = () => {
    this.setState({
      currImg: this.state.currImg + 1
    });
  };

  gotoImg = (index) => {
    this.setState({
      currImg: index
    });
  };

  handleClickImg = () => {
    if (this.state.currImg === this.props.imgs.length - 1) return;
    this.gotoNext();
  };

  onAlbumClick = (event) => {
    this.openImgsViewer(0, event);
  };

  render() {
    console.log('render');

    const { album } = this.props;

    return (
      <div onClick={this.onAlbumClick} className="album">
        <AlbumImg imgUrl={album.coverPhotoBaseUrl} />
        <div>{album.title}</div>
        <div>{album.mediaItemsCount}</div>
        <ImgsViewer
          backdropCloseable
          currImg={this.state.currImg}
          imgs={this.props.imgs}
          isOpen={this.state.isOpen}
          onClickImg={this.handleClickImg}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrev}
          onClickThumbnail={this.gotoImg}
          onClose={this.closeImgsViewer}
          preventScroll={this.props.preventScroll}
          showThumbnails={this.props.showThumbnails}
          spinner={this.props.spinner}
          spinnerColor={this.props.spinnerColor}
          spinnerSize={this.props.spinnerSize}
          theme={this.props.theme}
        />
      </div>
    )
  }
}

export default Album;