import Action from '@app/shared/models/action';

const INIT_ACTION_TYPES = {
  LOCAL_STYLES: 'INIT/LOCAL_STYLES',
};

const initState = {
  localStyles: {},
};

const initReducer = (state = initState, action: Action) => {
  switch (action.type) {
    case INIT_ACTION_TYPES.LOCAL_STYLES: {

      return {
        ...state,
        localStyles: action.payload,
      };
    }
    default:

      return state;
  }
};

const setLocalStyles = (styles: any) => (dispatch: any) => {
  dispatch({
    type: INIT_ACTION_TYPES.LOCAL_STYLES,
    payload: styles,
  });
};

export default initReducer;
export {
  INIT_ACTION_TYPES,
  setLocalStyles,
};
