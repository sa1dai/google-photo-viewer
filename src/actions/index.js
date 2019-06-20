import ActionTypes from './action-types';

const userLoggedIn = () => {
  return {
    type: ActionTypes.userLoggedIn,
  };
};

const userLoggedOut = () => {
  return {
    type: ActionTypes.userLoggedOut,
  };
};

export {
  userLoggedIn,
  userLoggedOut
};
