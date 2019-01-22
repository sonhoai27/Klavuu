import Action from '@app/shared/models/action';

const INIT_ACTION_TYPES = {
  LOCAL_STYLES: 'INIT/LOCAL_STYLES',
  IS_LOADING: 'INIT/IS_LOADING',
  SHOW_HIDE_ALERT: 'INIT/SHOW_HIDE_ALERT',
};

const initState = {
  localStyles: {},
  LoginState: {},
  LoginCheckState: {},
  isLoading: false,
  showOrHideAlertState: {
    status: false,
  },
};

const initReducer = (state = initState, action: Action) => {
  switch (action.type) {
    case INIT_ACTION_TYPES.LOCAL_STYLES: {

      return {
        ...state,
        localStyles: action.payload,
      };
    }

    case INIT_ACTION_TYPES.IS_LOADING: {

      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case INIT_ACTION_TYPES.SHOW_HIDE_ALERT: {
      return {
        ...state,
        showOrHideAlertState: {
          ...state.showOrHideAlertState,
          ...action.payload,
        },
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

const actionShowHideLoading = (loading: boolean) => (dispatch: any) => {
  dispatch({
    type: INIT_ACTION_TYPES.IS_LOADING,
    payload: loading,
  });
};

const actionShowHideAlert = status => (dispatch: any) => {
  dispatch({
    type: INIT_ACTION_TYPES.SHOW_HIDE_ALERT,
    payload: status,
  });
};

export default initReducer;
export {
  INIT_ACTION_TYPES,
  setLocalStyles,
  actionShowHideLoading,
  actionShowHideAlert,
};
