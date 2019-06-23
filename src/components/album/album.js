import React, { Component } from 'react';

import './album.css';
import ImgsViewer from "react-images-viewer";
import withService from "src/hoc/with-service";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {closeImgsViewer, fetchAlbum, imgsViewerGotoNext, imgsViewerGotoPrev, imgsViewerOnImgClick} from "src/actions";

const AlbumImg = ({ imgUrl }) => {

  const albumImgStyle = {
    backgroundImage: `url(${imgUrl})`
  };

  return (
    <div style={albumImgStyle} className="album-img"/>
  );
};

class Album extends Component {

  closeImgsViewer = () => {
    this.props.closeImgsViewer();
  };

  gotoPrev = () => {
    this.props.imgsViewerGotoPrev();
  };

  gotoNext = () => {
    this.props.imgsViewerGotoNext();
  };

  gotoImg = (index) => {
    this.props.imgsViewerOnImgClick(index);
  };

  handleClickImg = () => {
    const { imgsViewer: { currImg }, photos } = this.props;

    if (currImg === photos.length - 1) return;

    this.gotoNext();
  };

  onAlbumClick = (event) => {
    event.preventDefault();

    const { user: { token }, album: { id }, fetchAlbum } = this.props;

    fetchAlbum(token, id);
  };

  render() {
    const { album, imgsViewer: { isOpen, currImg }, photos } = this.props;

    return (
      <div onClick={this.onAlbumClick} className="album">
        <AlbumImg imgUrl={album.coverPhotoBaseUrl} />
        <div><strong>{album.title}</strong></div>
        <div>Elements: {album.mediaItemsCount}</div>
        <ImgsViewer
          backdropCloseable
          currImg={currImg}
          imgs={photos}
          isOpen={isOpen}
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

const mapStateToProps = ({ user, imgsViewer, albumAsync: { photos } }) => {
  return { user, imgsViewer, photos };
};

const mapDispatchToProps = (dispatch, { service }) => {
  return bindActionCreators({
    fetchAlbum: fetchAlbum(service),
    closeImgsViewer: closeImgsViewer,
    imgsViewerGotoNext: imgsViewerGotoNext,
    imgsViewerGotoPrev: imgsViewerGotoPrev,
    imgsViewerOnImgClick: imgsViewerOnImgClick,
  }, dispatch);
};

export default compose(
  withService(),
  connect(mapStateToProps, mapDispatchToProps)
)(Album);