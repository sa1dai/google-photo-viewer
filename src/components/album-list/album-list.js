import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import './album-list.css';
import Album from "src/components/album";

const AlbumList = ({ data }) => {

  let albumNodes = data.map(album => {
    return (
      <Album key={album.id} album={album} />
    )
  });

  return (
    <div className="album-list">
      {albumNodes}
    </div>
  );
};

class AlbumListContainer extends Component {

  state = {
    offset: 0,
  };

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({ offset: offset });
  };

  getPageCount = () => {
    const { albums: { length }, perPage } = this.props;

    return Math.ceil(length / perPage);
  };

  getData = () => {
    const { albums, perPage } = this.props;
    const { offset } = this.state;

    return albums.slice(offset, offset + perPage);
  };

  render() {
    return (
      <React.Fragment>
        <AlbumList data={this.getData()} />
        <ReactPaginate
          previousLabel={'«'}
          nextLabel={'»'}
          breakLabel={'...'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          pageCount={this.getPageCount()}
          marginPagesDisplayed={3}
          pageRangeDisplayed={3}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </React.Fragment>
    );
  }
}

export default AlbumListContainer;