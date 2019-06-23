import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import './album-list.css';

const AlbumImg = ({ imgUrl }) => {

  const albumImgStyle = {
    backgroundImage: `url(${imgUrl})`
  };

  return (
    <div style={albumImgStyle} className="album-img"/>
  );
};

const AlbumList = ({ data }) => {

  let albumNodes = data.map(album => {
    return (
      <div key={album.id} className="album">
        <AlbumImg imgUrl={album.coverPhotoBaseUrl} />
        <div>{album.title}</div>
        <div>{album.mediaItemsCount}</div>
      </div>
    )
  });

  return (
      <ul>{albumNodes}</ul>
  );
};

class AlbumListContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      offset: 0,
      pageCount: Math.ceil(props.albums.length / props.perPage)
    };
  }

  componentDidMount() {
    this.setState({
      data: this.props.albums.slice(this.state.offset, this.state.offset + this.props.perPage)
    });
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({ offset: offset }, () => {
      this.setState({
        data: this.props.albums.slice(this.state.offset, this.state.offset + this.props.perPage)
      });
    });
  };

  render() {
    return (
      <div>
        <AlbumList data={this.state.data} />
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
        />
      </div>
    );
  }
}

export default AlbumListContainer;