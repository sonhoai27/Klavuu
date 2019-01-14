import {
  ADD_TAG, LIST_TAGS, UPDATE_TAG, DELETE_TAG,
} from './TagTypes';

import axios from 'axios'

import { API } from '@app/shared/const';

const actionAddTag = brand => async (dispatch) => {
  return await dispatch({
    type: ADD_TAG,
    payload: axios.post(`${API}tag`, brand),
  })
};

const actionGetTags = () => async (dispatch) => {
  return await dispatch({
    type: LIST_TAGS,
    payload: axios.get(`${API}tags`),
  })
};

const actionUpdateTag = (brand, id) => async (dispatch) => {
  return await dispatch({
    type: UPDATE_TAG,
    payload: axios.put(`${API}tag`, brand, {
      params: {
        id,
      },
    }),
  })
};

const actionDeleteTag = id => async (dispatch) => {
  return await dispatch({
    type: DELETE_TAG,
    payload: axios.delete(`${API}tag`, {
      params: {
        id,
      },
    }),
  })
};

export {
  actionAddTag,
  actionGetTags,
  actionUpdateTag,
  actionDeleteTag,
}
