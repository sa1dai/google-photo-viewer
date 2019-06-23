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

const albumRequested = () => {
  return {
    type: ActionTypes.fetchAlbumRequest
  };
};

const albumLoaded = (photos) => {
  return {
    type: ActionTypes.fetchAlbumSuccess,
    payload: photos
  };
};

const albumError = (error) => {
  return {
    type: ActionTypes.fetchAlbumFailure,
    payload: error
  };
};

const closeImgsViewer = () => {
  return {
    type: ActionTypes.closeImgsViewer
  };
};

const imgsViewerGotoNext = () => {
  return {
    type: ActionTypes.imgsViewerGotoNext
  };
};

const imgsViewerGotoPrev = () => {
  return {
    type: ActionTypes.imgsViewerGotoPrev
  };
};

const imgsViewerOnImgClick = (imgIndex) => {
  return {
    type: ActionTypes.fetchAlbumFailure,
    payload: imgIndex
  };
};

const fetchAlbums = (service) => (authToken) => (dispatch) => {
  dispatch(albumsRequested());
  service.getAlbums(authToken)
    .then(({ albums }) => dispatch(albumsLoaded(albums)))
    .catch((err) => dispatch(albumsError(err)));
};

const fetchAlbum = (service) => (authToken, albumId) => (dispatch) => {
  dispatch(albumRequested());
  service.loadFromAlbum(authToken, albumId)
    .then((data) => {
      const photos = data.photos.map(({baseUrl, filename}) =>
        ({src: baseUrl, caption: filename})
      );

      return dispatch(albumLoaded(photos));
    })
    .catch((err) => dispatch(albumError(err)));
};

export {
  userSignIn,
  userSignOut,
  fetchAlbums,
  fetchAlbum,
  closeImgsViewer,
  imgsViewerGotoNext,
  imgsViewerGotoPrev,
  imgsViewerOnImgClick,
  ActionTypes
};
