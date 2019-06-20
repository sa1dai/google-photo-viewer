import ActionTypes from "src/actions/action-types";

const userReducer = (state, action) => {

  if (state === undefined) {
    return {
      isLoggedIn: false,
      name: null,
      image: null,
      token: null
    };
  }

  switch (action.type) {
    case ActionTypes.userSignIn:
      const { name, image, token } = action.payload;

      return {
        isLoggedIn: true,
        name: name,
        image: image,
        token: token
      };

    case ActionTypes.userSignOut:
      return {
        isLoggedIn: false,
        name: null,
        image: null,
        token: null
      };

    default:
      return state.user;
  }
};

export default userReducer;
