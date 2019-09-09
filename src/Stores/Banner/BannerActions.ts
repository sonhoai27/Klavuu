import { API } from '@app/Shared/Const';
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

const actionGetBanner = (id: any) => dispatch => (dispatch({
  type: GET_BANNER,
  payload: axios.get(`${API}banners/${id}`),
}))

const actionAddBanner = form => (dispatch) => {
  return dispatch({
    type: ADD_BANNER,
    payload: axios.post(`${API}banners`, form),
  })
}

const actionUpdateBanner = (id: any, form: any) => dispatch => (
  dispatch({
    type: UPDATE_BANNER,
    payload: axios.put(`${API}banners/${id}`, form),
  })
)

const actionDeleteBanner = (id: string) => dispatch => (
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
