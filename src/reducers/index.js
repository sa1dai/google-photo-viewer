import userReducer from "src/reducers/user-reducer";
import albumListReducerAsync from "src/reducers/album-list-reducer-async";

const reducer = (state, action) => {
  return {
    user: userReducer(state, action),
    albumListAsync: albumListReducerAsync(state, action)
  };
};

export default reducer;
