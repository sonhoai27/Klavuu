import axios from 'axios'

import Action from '@app/shared/models/action';
import { FAILURE, REQUEST, SUCCESS } from '@app/configs/ActionType';
import { API } from '@app/shared/const';

const INIT_ACTION_TYPES = {
  LOCAL_STYLES: 'INIT/LOCAL_STYLES',
  IS_LOADING: 'INIT/IS_LOADING',
  SHOW_HIDE_ALERT: 'INIT/SHOW_HIDE_ALERT',
  SHOW_HIDE_SHOPPING_CART: 'INIT/SHOW_HIDE_SHOPPING_CART',
  SHOW_HIDE_POPUP: 'INIT/SHOW_HIDE_POPUP',
  GET_SETTINGS: 'INIT/GET_SETTINGS',
  LOGIN: 'INIT/LOGIN',
  CHECK_LOGIN: 'INIT/CHECK_LOGIN',
};

const initState = {
  localStyles: {},
  LoginCheckState: {},
  isLoading: false,
  showOrHideAlertState: {
    status: false,
    title: '',
    icon: undefined,
  },
  isShowShoppingCartState: false,
  isShowHidePopupState: {
    status: false,
  },
  settingsState: {},
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

    case INIT_ACTION_TYPES.SHOW_HIDE_POPUP: {

      return {
        ...state,
        isShowHidePopupState: action.payload,
      };
    }

    case INIT_ACTION_TYPES.SHOW_HIDE_SHOPPING_CART: {

      return {
        ...state,
        isShowShoppingCartState: action.payload,
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

    case REQUEST(INIT_ACTION_TYPES.GET_SETTINGS):
    case FAILURE(INIT_ACTION_TYPES.GET_SETTINGS): {
      return {
        ...state,
      }
    }
    case SUCCESS(INIT_ACTION_TYPES.GET_SETTINGS): {
      return {
        ...state,
        settingsState: action.payload.data,
      }
    }

    case REQUEST(INIT_ACTION_TYPES.CHECK_LOGIN):
    case FAILURE(INIT_ACTION_TYPES.CHECK_LOGIN): {
      return {
        ...state,
      }
    }
    case SUCCESS(INIT_ACTION_TYPES.CHECK_LOGIN): {
      return {
        ...state,
        LoginCheckState: action.payload.data,
      }
    }

    case REQUEST(INIT_ACTION_TYPES.LOGIN):
    case FAILURE(INIT_ACTION_TYPES.LOGIN):
    case SUCCESS(INIT_ACTION_TYPES.GET_SETTINGS): {
      return {
        ...state,
      }
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

const actionShowHidePopup = status => (dispatch: any) => {
  dispatch({
    type: INIT_ACTION_TYPES.SHOW_HIDE_POPUP,
    payload: status,
  });
};

const actionShowShoppingCart = status => (dispatch: any) => {
  dispatch({
    type: INIT_ACTION_TYPES.SHOW_HIDE_SHOPPING_CART,
    payload: status,
  });
};

const actionGetSettings = () => async (dispatch) => {
  return await dispatch({
    type: INIT_ACTION_TYPES.GET_SETTINGS,
    payload: axios.get(`${API}configs`),
  })
};

const actionLogin = form => async (dispatch) => {
  return await dispatch({
    type: INIT_ACTION_TYPES.LOGIN,
    payload: axios.post(`${API}auth/login`, form),
  })
};

const actionCheckLogin = () => async (dispatch) => {
  return await dispatch({
    type: INIT_ACTION_TYPES.CHECK_LOGIN,
    payload: axios.post(`${API}auth/check`, {
      token: localStorage.getItem('token'),
    }),
  })
};

export default initReducer;
export {
  INIT_ACTION_TYPES,
  setLocalStyles,
  actionShowHideLoading,
  actionShowHideAlert,
  actionShowShoppingCart,
  actionShowHidePopup,
  actionGetSettings,
  actionLogin,
  actionCheckLogin,
};
