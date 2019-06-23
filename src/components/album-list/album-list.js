import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import './album-list.css';
import Album from "src/components/album";

const AlbumList = ({ data }) => {

  function makeUnsplashSrc (id) {
    return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=1024&h=1024`
  }

// Unsplash images from the "Adventure" collection
// https://unsplash.com/collections/369/adventure

  const DEFAULT_IMAGES = [
    { id: '1526382551041-3c817fc3d478', caption: 'Photo by Simon Alexander', orientation: 'square', useForDemo: true },
    { id: '1522985225914-17a10a58c8ec', caption: 'Photo by Blake Cheek', orientation: 'square', useForDemo: true },
    { id: '1522931698295-e7b4d3e4188f', caption: 'Photo by Oliver Sjöström', orientation: 'square', useForDemo: true },
    { id: '1516175663209-ac2459a5652f', caption: 'Photo by Jeremy Bishop', orientation: 'square', useForDemo: true },
    { id: '1515911601378-97de98db6dda', caption: 'Photo by Emily Reider', orientation: 'square', useForDemo: true },
  ]

  let albumNodes = data.map(album => {
    return (
      <Album key={album.id} album={album}
             imgs={DEFAULT_IMAGES.map(({ caption, id }) => ({
               src: makeUnsplashSrc(id),
               caption,
             }))}/>
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