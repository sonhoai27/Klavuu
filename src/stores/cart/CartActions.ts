import { API } from '@app/shared/const';
import axios from 'axios'

import {
  ADD_TO_CART,
  CART,
  ADD_ORDER,
  GET_ORDERS,
  GET_ORDER,
  EMPTY_CART,
} from './CartTypes';

const actionAddToCart = (product, type, cart) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch({
      type: ADD_TO_CART,
      payload: makeQty(product, type, cart),
    })
    resolve()
  })
}

const actionAddOrder = form => (dispatch) => {
  return dispatch({
    type: ADD_ORDER,
    payload: axios.post(`${API}order`, form),
  })
}

const actionGetOrders = queries => (dispatch) => {
  return dispatch({
    type: GET_ORDERS,
    payload: axios.get(`${API}orders${queries}`),
  })
}

const actionGetOrder = orderId => (dispatch) => {
  return dispatch({
    type: GET_ORDER,
    payload: axios.get(`${API}order/${orderId}`),
  })
}

const actionUpdateOrder = (form, orderId) => (dispatch) => {
  return dispatch({
    type: GET_ORDER,
    payload: axios.put(`${API}order/${orderId}`, form),
  })
}

const actionEmptyCart = () => (dispatch) => {
  localStorage.setItem('cart', JSON.stringify([]))
  return dispatch({
    type: EMPTY_CART,
    payload: [],
  })
}

const actionLoadCart = () => (dispatch) => {
  const temp = JSON.parse(localStorage.getItem('cart'));

  return dispatch({
    type: CART,
    payload: temp === null ? [] : temp,
  })
}

const makeQty = (item, type, list) => {
  let tempInitState = [...[], ...list];
  const tempList = tempInitState.filter((e) => {
    return e.product_id === item.product_id
  });
  if (tempList.length === 0) {
    tempInitState = [...tempInitState, item]
  } else if (tempList.length !== 0) {
    tempInitState.map((e) => {
      if (e.product_id === item.product_id) {
        if (type === 0) {
          e.qty = e.qty + 1;
        }else {
          if (e.qty === 1) {
            tempInitState = tempInitState.filter((element) => {
              return element.product_id !== item.product_id
            });
          }else {
            e.qty = e.qty - 1;
          }
        }
      }
    })
  }
  localStorage.setItem('cart', JSON.stringify(tempInitState));
  return tempInitState;
};

export {
  actionAddToCart,
  actionLoadCart,
  actionAddOrder,
  actionGetOrders,
  actionGetOrder,
  actionUpdateOrder,
  actionEmptyCart,
}
