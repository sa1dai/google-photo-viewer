import { ActionTypes } from '../actions';

const albumsReducerAsync = (state, action) => {

  if (state === undefined) {
    return {
      albums: [],
      loading: true,
      error: null
    };
  }

  switch (action.type) {
    case ActionTypes.fetchAlbumsRequest:
      return {
        albums: [],
        loading: true,
        error: null
      };

    case ActionTypes.fetchAlbumsSuccess:
      return {
        albums: action.payload,
        loading: false,
        error: null
      };

    case ActionTypes.fetchAlbumsFailure:
      return {
        albums: [],
        loading: false,
        error: action.payload
      };

    default:
      return state.albumsAsync;
  }
};

export default albumsReducerAsync;
