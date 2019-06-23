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
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default AlbumListContainer;