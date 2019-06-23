import { ActionTypes } from '../actions';

const imgsViewerReducer = (state, action) => {

  if (state === undefined) {
    return {
      isOpen: false,
      currImg: 0
    };
  }

  switch (action.type) {
    case ActionTypes.fetchAlbumSuccess:
      return {
        isOpen: true,
        currImg: 0
      };

    case ActionTypes.closeImgsViewer:
      return {
        isOpen: false,
        currImg: 0
      };

    case ActionTypes.imgsViewerGotoPrev:
      return {
        isOpen: true,
        currImg: state.imgsViewer.currImg - 1
      };

    case ActionTypes.imgsViewerGotoNext:
      return {
        isOpen: true,
        currImg: state.imgsViewer.currImg + 1
      };

    case ActionTypes.imgsViewerOnImgClick:
      return {
        isOpen: true,
        currImg: action.payload
      };

    default:
      return state.imgsViewer;
  }
};

export default imgsViewerReducer;
