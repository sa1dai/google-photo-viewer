import userReducer from "src/reducers/user-reducer";
import albumsReducerAsync from "src/reducers/albums-reducer-async";

const reducer = (state, action) => {
  return {
    user: userReducer(state, action),
    albumsAsync: albumsReducerAsync(state, action)
  };
};

export default reducer;
