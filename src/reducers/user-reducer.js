import ActionTypes from "src/actions/action-types";

const userReducer = (state, action) => {

  if (state === undefined) {
    return {
      isLoggedIn: false,
      name: null,
      imageUrl: null,
      token: null
    };
  }

  switch (action.type) {
    case ActionTypes.userSignIn:
      const { name, imageUrl, token } = action.payload;

      return {
        isLoggedIn: true,
        name: name,
        imageUrl: imageUrl,
        token: token
      };

    case ActionTypes.userSignOut:
      return {
        isLoggedIn: false,
        name: null,
        imageUrl: null,
        token: null
      };

    default:
      return state.user;
  }
};

export default userReducer;
