import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import './album-list.css';

class AlbumList extends Component {

  render() {
    let albumNodes = this.props.data.map(album => {
      return <div key={album.id}>{album.title}</div>;
    });

    return (
        <ul>{albumNodes}</ul>
    );

    /*return (
      <div id="project-comments" className="commentList">
        <ul>{albumNodes}</ul>
      </div>
    );*/
  }
}

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