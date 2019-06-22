import ActionTypes from './action-types';

const userSignIn = (user) => {
  return {
    type: ActionTypes.userSignIn,
    payload: user
  };
};

const userSignOut = () => {
  return {
    type: ActionTypes.userSignOut,
  };
};

const albumsRequested = () => {
  return {
    type: ActionTypes.fetchAlbumsRequest
  };
};

const albumsLoaded = (albums) => {
  return {
    type: ActionTypes.fetchAlbumsSuccess,
    payload: albums
  };
};

const albumsError = (error) => {
  return {
    type: ActionTypes.fetchAlbumsFailure,
    payload: error
  };
};

const fetchAlbums = (service) => (authToken) => (dispatch) => {
  dispatch(albumsRequested());
  service.getAlbums(authToken)
    .then((data) => dispatch(albumsLoaded(data)))
    .catch((err) => dispatch(albumsError(err)));
};

export {
  userSignIn,
  userSignOut,
  fetchAlbums,
  ActionTypes
};
