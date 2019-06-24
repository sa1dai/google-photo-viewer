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

  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
    };
  }

  /*componentDidMount() {
    this.setState({
      data: this.props.albums.slice(this.state.offset, this.state.offset + this.props.perPage)
    });
  }*/

  componentDidUpdate() {
    /*this.setState({
      data: [],
      offset: 0,
      pageCount: Math.ceil(this.props.albums.length / this.props.perPage)
    });*/
    /*this.setState({
          offset: 0,
          pageCount: Math.ceil(this.props.albums.length / this.props.perPage)
        }, () => {
        this.setState({
          data: this.props.albums.slice(this.state.offset, this.state.offset + this.props.perPage)
        });
    });*/
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
    const pageCount = Math.ceil(this.props.albums.length / this.props.perPage);
    const data = this.props.albums.slice(this.state.offset, this.state.offset + this.props.perPage)

    return (
      <React.Fragment>
        <AlbumList data={data} />
        <ReactPaginate
          previousLabel={'«'}
          nextLabel={'»'}
          breakLabel={'...'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          pageCount={pageCount}
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