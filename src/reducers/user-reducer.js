import ActionTypes from "src/actions/action-types";

const userReducer = (state, action) => {

  if (state === undefined) {
    return {
      isLoggedIn: false,
      name: null,
      image: null
    };
  }

  switch (action.type) {
    case ActionTypes.userLoggedIn:
      const { name, image } = action.payload;

      return {
        isLoggedIn: true,
        name: name,
        image: image
      };

    case ActionTypes.userLoggedOut:
      return {
        isLoggedIn: false,
        name: null,
        image: null
      };

    default:
      return state.user;
  }
};

export default userReducer;
