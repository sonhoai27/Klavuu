import axios from 'axios'

import {
  ADD_CMT,
  UPDATE_CMT,
  DELETE_CMT,
  GET_CMT_BY_PRD_ID,
  GET_CMT,
  CHECK_ORDER_ID,
} from './CommentTypes';
import { API } from '@app/shared/const';

const actionAddCMT = form => (dispatch) => {
  return dispatch({
    type: ADD_CMT,
    payload: axios.post(`${API}comment`, form),
  })
}

const actionGetCMTS = (query = '') => (dispatch) => {
  return dispatch({
    type: GET_CMT,
    payload: axios.get(`${API}comments${query}`),
  })
}

// @ts-ignore
const actionGetCMTSByPrdId = (prdId, query = '') => (dispatch) => {
  return dispatch({
    type: GET_CMT_BY_PRD_ID,
    payload: axios.get(`${API}comments/${prdId}${query}`),
  })
}

const actionDeleteCMT = cmtId => (dispatch) => {
  return dispatch({
    type: DELETE_CMT,
    payload: axios.delete(`${API}comment/${cmtId}`),
  })
}

const actionUpdateCMT = (cmtId, form) => (dispatch) => {
  return dispatch({
    type: UPDATE_CMT,
    payload: axios.put(`${API}comment/${cmtId}`, form),
  })
}

const actionCheckOrderId = orderId => (dispatch) => {
  return dispatch({
    type: CHECK_ORDER_ID,
    payload: axios.get(`${API}comment/verify/${orderId}`),
  })
}

export {
  actionAddCMT,
  actionGetCMTS,
  actionGetCMTSByPrdId,
  actionDeleteCMT,
  actionUpdateCMT,
  actionCheckOrderId,
}
