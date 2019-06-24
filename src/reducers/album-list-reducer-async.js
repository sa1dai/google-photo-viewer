import { ActionTypes } from '../actions';

const albumListReducerAsync = (state, action) => {

  if (state === undefined) {
    return {
      albums: [],
      loading: false,
      error: null,
      filterTerm: ''
    };
  }

  switch (action.type) {
    case ActionTypes.fetchAlbumsRequest:
      return {
        albums: [],
        loading: true,
        error: null,
        filterTerm: ''
      };

    case ActionTypes.fetchAlbumsSuccess:
      return {
        albums: action.payload,
        loading: false,
        error: null,
        filterTerm: ''
      };

    case ActionTypes.fetchAlbumsFailure:
      return {
        albums: [],
        loading: false,
        error: action.payload,
        filterTerm: ''
      };

    case ActionTypes.filterAlbums:
      return {
        albums: state.albumListAsync.albums,
        loading: false,
        error: null,
        filterTerm: action.payload
      };

    default:
      return state.albumListAsync;
  }
};

export default albumListReducerAsync;
