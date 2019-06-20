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

export {
  userSignIn,
  userSignOut,
  ActionTypes
};
