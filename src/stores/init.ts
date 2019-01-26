import Action from '@app/shared/models/action';

const INIT_ACTION_TYPES = {
  LOCAL_STYLES: 'INIT/LOCAL_STYLES',
  IS_LOADING: 'INIT/IS_LOADING',
  SHOW_HIDE_ALERT: 'INIT/SHOW_HIDE_ALERT',
  SHOW_HIDE_SHOPPING_CART: 'INIT/SHOW_HIDE_SHOPPING_CART',
  SHOW_HIDE_POPUP: 'INIT/SHOW_HIDE_POPUP',
};

const initState = {
  localStyles: {},
  LoginState: {},
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

export default initReducer;
export {
  INIT_ACTION_TYPES,
  setLocalStyles,
  actionShowHideLoading,
  actionShowHideAlert,
  actionShowShoppingCart,
  actionShowHidePopup,
};
