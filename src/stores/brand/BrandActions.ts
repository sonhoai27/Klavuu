import {
  ADD_BRAND,
  LIST_BRANDS,
  UPDATE_BRAND,
  DELETE_BRAND,
  LIST_BRAND_CAT,
} from './BrandTypes';

import axios from 'axios'

import { API } from '@app/shared/const';

const actionAddBrand = brand => async (dispatch) => {
  return await dispatch({
    type: ADD_BRAND,
    payload: axios.post(`${API}brand`, brand),
  })
};

const actionGetBrands = () => async (dispatch) => {
  return await dispatch({
    type: LIST_BRANDS,
    payload: axios.get(`${API}brands`),
  })
};

const actionGetBrandCats = brand => async (dispatch) => {
  return await dispatch({
    type: LIST_BRAND_CAT,
    payload: axios.get(`${API}brand/cats/${brand}`),
  })
};

const actionUpdateBrand = (brand, id) => async (dispatch) => {
  return await dispatch({
    type: UPDATE_BRAND,
    payload: axios.put(`${API}brand`, brand, {
      params: {
        id,
      },
    }),
  })
};

const actionDeleteBrand = id => async (dispatch) => {
  return await dispatch({
    type: DELETE_BRAND,
    payload: axios.delete(`${API}brand`, {
      params: {
        id,
      },
    }),
  })
};

export {
  actionAddBrand,
  actionGetBrands,
  actionUpdateBrand,
  actionDeleteBrand,
  actionGetBrandCats,
}
