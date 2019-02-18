import {
  ADD_PRODUCT,
  LIST_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  ADD_BRAND_TAG,
  ADD_TAG_PRODUCT,
  GET_PRODUCT_BY_ALIAS,
  DELETE_TAG_PRODUCT,
  GET_TAG_PRODUCT,
  GET_PRODUCTS_FILTER,
  GET_PROVINCE,
  GET_DISTRICT,
  GET_WARD,
  GET_NEW_PRODUCT,
} from './ProductTypes';

import axios from 'axios'

import { API } from '@app/shared/const';

const actionAddProduct = product => async (dispatch) => {
  return await dispatch({
    type: ADD_PRODUCT,
    payload: axios.post(`${API}product`, product),
  })
};

const actionBrandTag = form => async (dispatch) => {
  return await dispatch({
    type: ADD_BRAND_TAG,
    payload: axios.post(`${API}product/brand_tag`, form),
  })
};

const actionTagProduct = form => async (dispatch) => {
  return await dispatch({
    type: ADD_TAG_PRODUCT,
    payload: axios.post(`${API}product/tag_product`, form),
  })
};

const actionGetProducts = query => async (dispatch) => {
  return await dispatch({
    type: LIST_PRODUCTS,
    payload: axios.get(`${API}products${query}`),
  })
};

const actionGetNewProducts = () => async (dispatch) => {
  return await dispatch({
    type: GET_NEW_PRODUCT,
    payload: axios.get(`${API}products/new`),
  })
};

const actionGetProductsFiler = (query = '') => async (dispatch) => {
  return await dispatch({
    type: GET_PRODUCTS_FILTER,
    payload: axios.get(`${API}products/filter${query}`),
  })
};

const actionGetTagsProduct = (productId: any) => async (dispatch) => {
  return await dispatch({
    type: GET_TAG_PRODUCT,
    payload: axios.get(`${API}product/tags/${productId}`),
  })
};

const actionDeleteTagProduct = (tagId: any) => async (dispatch) => {
  return await dispatch({
    type: DELETE_TAG_PRODUCT,
    payload: axios.delete(`${API}product/tag/${tagId}`),
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
    payload: axios.put(`${API}product/${id}`, product),
  })
};

const actionDeleteProduct = id => async (dispatch) => {
  return await dispatch({
    type: DELETE_PRODUCT,
    payload: axios.delete(`${API}products/${id}`),
  })
};

const actionGetProvince = () => async (dispatch) => {
  return await dispatch({
    type: GET_PROVINCE,
    payload: axios.get(`${API}province`),
  })
};

const actionGetDistrict = provinceId => async (dispatch) => {
  return await dispatch({
    type: GET_DISTRICT,
    payload: axios.get(`${API}district/${provinceId}`),
  })
};

const actionGetWard = districtId => async (dispatch) => {
  return await dispatch({
    type: GET_WARD,
    payload: axios.get(`${API}ward/${districtId}`),
  })
};

export {
  actionAddProduct,
  actionGetProducts,
  actionUpdateProduct,
  actionDeleteProduct,
  actionTagProduct,
  actionBrandTag,
  actionGetProduct,
  actionGetTagsProduct,
  actionDeleteTagProduct,
  actionGetProductsFiler,
  actionGetProvince,
  actionGetDistrict,
  actionGetWard,
  actionGetNewProducts,
}
