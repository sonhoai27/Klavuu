import axios from 'axios'

import Action from '@app/Shared/Models/action';
import { FAILURE, REQUEST, SUCCESS } from '@app/configs/ActionType';
import { API } from '@app/Shared/Const';
import { POST, GET } from '@app/configs/Request';

const INIT_ACTION_TYPES = {
  LOCAL_STYLES: 'INIT/LOCAL_STYLES',
  IS_LOADING: 'INIT/IS_LOADING',
  SHOW_HIDE_ALERT: 'INIT/SHOW_HIDE_ALERT',
  SHOW_HIDE_SHOPPING_CART: 'INIT/SHOW_HIDE_SHOPPING_CART',
  SHOW_HIDE_POPUP: 'INIT/SHOW_HIDE_POPUP',
  GET_SETTINGS: 'INIT/GET_SETTINGS',
  USER_LOADED: 'AUTH/USER_LOADED',
  AUTH_ERROR: 'AUTH/AUTH_ERROR',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
  LOGIN_FAIL: 'AUTH/LOGIN_FAIL',
  LOGOUT_SUCCESS: 'AUTH/LOGOUT_SUCCESS',
};

const initState = {
  localStyles: {},
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
  token: localStorage.getItem('zone-uuid'),
  isAuthenticated: null,
  user: null,
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

    case INIT_ACTION_TYPES.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case INIT_ACTION_TYPES.LOGIN_SUCCESS:
      localStorage.setItem('zone-uuid', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case INIT_ACTION_TYPES.AUTH_ERROR: {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }
    case INIT_ACTION_TYPES.LOGIN_FAIL:
    case INIT_ACTION_TYPES.LOGOUT_SUCCESS:
      localStorage.removeItem('zone-uuid');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: null,
      };

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

// CHECK TOKEN & LOAD USER
// tslint:disable-next-line
const loadUser = () => (dispatch) => {

  return GET('users', {}, true)
    .then((res: any) => dispatch({
      type: INIT_ACTION_TYPES.USER_LOADED,
      payload: res.data,
    }))
    .catch(() => {
      return dispatch({
        type: INIT_ACTION_TYPES.AUTH_ERROR,
      });
    });
};

// LOGIN USER
const login = (email: string, password: string) => (dispatch: any) => {
  // Request Body
  const body = { email, password };

  return POST('login', body)
    .then((res: any) =>  dispatch({
      type: INIT_ACTION_TYPES.LOGIN_SUCCESS,
      payload: res.data,
    }))
    .catch(() => dispatch({
      type: INIT_ACTION_TYPES.LOGIN_FAIL,
    }));
};

// LOGOUT USER
const logout = () => (dispatch: any) => {
  POST('auth/logout/', {})
    .then(() => {
      dispatch({
        type: INIT_ACTION_TYPES.LOGOUT_SUCCESS,
      });
    })
    .catch(() => {
    });
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
  logout,
  login,
  loadUser,
};
