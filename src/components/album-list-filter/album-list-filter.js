import React, { Component } from 'react';

import './album-list-filter.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {filterAlbums} from "src/actions";

class AlbumListFilter extends Component {

  onTermChange = (e) => {
    this.props.filterAlbums(e.target.value);
  };

  render() {
    const { filterTerm } = this.props;

    return (
      <React.Fragment>
        <h3>Filter albums</h3>
        <input type="text"
               className="form-control search-input albums-filter"
               placeholder="type to filter"
               value={filterTerm}
               onChange={ this.onTermChange } />
      </React.Fragment>
    );
  };
}

const mapStateToProps = ({ albumListAsync: { filterTerm } }) => {
  return { filterTerm };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    filterAlbums: filterAlbums,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumListFilter);
