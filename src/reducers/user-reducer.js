//import { ActionTypes } from '../actions';

const userReducer = (state, action) => {

  return {};

  /*if (state === undefined) {
    return {
      boardTitle: "",
      serverIsProcessingRequest: false,
      error: null
    };
  }

  switch (action.type) {
    case ActionTypes.addBoardRequest:
      return {
        boardTitle: "",
        serverIsProcessingRequest: true,
        error: null
      };

    case ActionTypes.addBoardSuccess:
      return {
        boardTitle: "",
        serverIsProcessingRequest: false,
        error: null
      };

    case ActionTypes.addBoardFailure:
      return {
        boardTitle: "",
        serverIsProcessingRequest: false,
        error: action.payload
      };

    case ActionTypes.boardAddTitleChanged:
      return {
        boardTitle: action.payload,
        serverIsProcessingRequest: false,
        error: null
      };

    default:
      return state.boardListAddForm;
  }*/
};

export default userReducer;
