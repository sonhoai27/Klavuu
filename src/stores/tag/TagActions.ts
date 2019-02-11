import {
  ADD_TAG,
  LIST_TAGS,
  UPDATE_TAG,
  DELETE_TAG,
  LIST_TAG_BRANDS,
  LIST_TAGS_FOR_MENU,
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

const actionGetTagBrands = tag => async (dispatch) => {
  return await dispatch({
    type: LIST_TAG_BRANDS,
    payload: axios.get(`${API}tag/brands/${tag}`),
  })
};

const actionGetTagsForMenu = () => async (dispatch) => {
  return await dispatch({
    type: LIST_TAGS_FOR_MENU,
    payload: axios.get(`${API}tags/menu`),
  })
};

const actionUpdateTag = (tag, id) => async (dispatch) => {
  return await dispatch({
    type: UPDATE_TAG,
    payload: axios.put(`${API}tag/${id}`, tag),
  })
};

const actionDeleteTag = id => async (dispatch) => {
  return await dispatch({
    type: DELETE_TAG,
    payload: axios.delete(`${API}tag/${id}`),
  })
};

export {
  actionAddTag,
  actionGetTags,
  actionUpdateTag,
  actionDeleteTag,
  actionGetTagBrands,
  actionGetTagsForMenu,
}
