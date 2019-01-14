import {
  ADD_PRODUCT,
  LIST_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  ADD_BRAND_CAT,
  ADD_TAG_PRODUCT,
  GET_PRODUCT_BY_ALIAS,
} from './ProductTypes';

import axios from 'axios'

import { API } from '@app/shared/const';

const actionAddProduct = product => async (dispatch) => {
  return await dispatch({
    type: ADD_PRODUCT,
    payload: axios.post(`${API}product`, product),
  })
};

const actionBrandCat = form => async (dispatch) => {
  return await dispatch({
    type: ADD_BRAND_CAT,
    payload: axios.post(`${API}product/brand_cat`, form),
  })
};

const actionTagProduct = form => async (dispatch) => {
  return await dispatch({
    type: ADD_TAG_PRODUCT,
    payload: axios.post(`${API}product/tag_product`, form),
  })
};

const actionGetProducts = () => async (dispatch) => {
  return await dispatch({
    type: LIST_PRODUCTS,
    payload: axios.get(`${API}products`),
  })
};

const actionGetProduct = (alias: string) => async (dispatch) => {
  return await dispatch({
    type: GET_PRODUCT_BY_ALIAS,
    payload: axios.get(`${API}product/${alias}`),
  })
};

const actionUpdateProduct = (product, id) => async (dispatch) => {
  return await dispatch({
    type: UPDATE_PRODUCT,
    payload: axios.put(`${API}product`, product, {
      params: {
        id,
      },
    }),
  })
};

const actionDeleteProduct = id => async (dispatch) => {
  return await dispatch({
    type: DELETE_PRODUCT,
    payload: axios.delete(`${API}product`, {
      params: {
        id,
      },
    }),
  })
};

export {
  actionAddProduct,
  actionGetProducts,
  actionUpdateProduct,
  actionDeleteProduct,
  actionTagProduct,
  actionBrandCat,
  actionGetProduct,
}
