export default class ActionTypes {

  static get userSignIn() {
    return 'USER_SIGN_IN';
  }

  static get userSignOut() {
    return 'USER_SIGN_OUT';
  }

  static get fetchAlbumsRequest() {
    return 'FETCH_ALBUMS_REQUEST';
  }

  static get fetchAlbumsSuccess() {
    return 'FETCH_ALBUMS_SUCCESS';
  }

  static get fetchAlbumsFailure() {
    return 'FETCH_ALBUMS_FAILURE';
  }
}
