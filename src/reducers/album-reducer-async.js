import { ActionTypes } from '../actions';

const albumReducerAsync = (state, action) => {

  if (state === undefined) {
    return {
      photos: [],
      loading: true,
      error: null
    };
  }

  switch (action.type) {
    case ActionTypes.fetchAlbumRequest:
      return {
        photos: [],
        loading: true,
        error: null
      };

    case ActionTypes.fetchAlbumSuccess:
      return {
        photos: action.payload,
        loading: false,
        error: null
      };

    case ActionTypes.fetchAlbumFailure:
      return {
        photos: [],
        loading: false,
        error: action.payload
      };

    default:
      return state.albumAsync;
  }
};

export default albumReducerAsync;
