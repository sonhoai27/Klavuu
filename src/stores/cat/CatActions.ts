import {
  ADD_CAT, LIST_CATS, UPDATE_CAT, DELETE_CAT,
} from './CatTypes';

import axios from 'axios'

import { API } from '@app/shared/const';

const actionAddCat = cat => async (dispatch) => {
  return await dispatch({
    type: ADD_CAT,
    payload: axios.post(`${API}cat`, cat),
  })
};

const actionGetCats = () => async (dispatch) => {
  return await dispatch({
    type: LIST_CATS,
    payload: axios.get(`${API}cats`),
  })
};

const actionUpdateCat = (cat, id) => async (dispatch) => {
  return await dispatch({
    type: UPDATE_CAT,
    payload: axios.put(`${API}cat`, cat, {
      params: {
        id,
      },
    }),
  })
};

const actionDeleteCat = id => async (dispatch) => {
  return await dispatch({
    type: DELETE_CAT,
    payload: axios.delete(`${API}cat`, {
      params: {
        id,
      },
    }),
  })
};

export {
  actionAddCat,
  actionGetCats,
  actionUpdateCat,
  actionDeleteCat,
}
