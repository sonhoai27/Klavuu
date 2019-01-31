import { API } from '@app/shared/const';
import axios from 'axios'

import {
  GET_BANNERS,
  GET_BANNER,
  ADD_BANNER,
  UPDATE_BANNER,
  DELETE_BANNER,
} from './BannerTypes';

const actionGetBanners = () => dispatch => (
  dispatch({
    type: GET_BANNERS,
    payload: axios.get(`${API}banners`),
  })
)

const actionGetBanner = id => dispatch => (
  dispatch({
    type: GET_BANNER,
    payload: axios.get(`${API}banners/${id}`),
  })
)

const actionAddBanner = form => (dispatch) => {
  return dispatch({
    type: ADD_BANNER,
    payload: axios.post(`${API}banners`, form),
  })
}

const actionUpdateBanner = (id, form) => dispatch => (
  dispatch({
    type: UPDATE_BANNER,
    payload: axios.put(`${API}banners/${id}`, form),
  })
)

const actionDeleteBanner = id => dispatch => (
  dispatch({
    type: DELETE_BANNER,
    payload: axios.delete(`${API}banners/${id}`),
  })
)

export {
  actionGetBanners,
  actionGetBanner,
  actionAddBanner,
  actionUpdateBanner,
  actionDeleteBanner,
}
