import { API } from '@app/shared/const';
import axios from 'axios'

import { BlogTypes } from './BlogTypes';

const actionGetBlogs = (query = '') => async (dispatch) => {
  return await dispatch({
    type: BlogTypes.LIST,
    payload: axios.get(`${API}blogs${query}`),
  })
}

const actionGetBlog = alias => async (dispatch) => {
  return await dispatch({
    type: BlogTypes.DETAIL,
    payload: axios.get(`${API}blogs/${alias}`),
  })
}

const actionDeleteBlog = id => async (dispatch) => {
  return await dispatch({
    type: BlogTypes.DETAIL,
    payload: axios.delete(`${API}blogs/${id}`),
  })
}

const actionAddBlog = form => async (dispatch) => {
  return await dispatch({
    type: BlogTypes.DETAIL,
    payload: axios.post(`${API}blogs`, form),
  })
}

const actionUpdateBlog = (form, id) => async (dispatch) => {
  return await dispatch({
    type: BlogTypes.DETAIL,
    payload: axios.put(`${API}blogs/${id}`, form),
  })
}

export {
  actionGetBlogs,
  actionGetBlog,
  actionDeleteBlog,
  actionAddBlog,
  actionUpdateBlog,
}
