import userReducer from "src/reducers/user-reducer";

const reducer = (state, action) => {
  return {
    user: userReducer(state, action)
  };
};

export default reducer;
