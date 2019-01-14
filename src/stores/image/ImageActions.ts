import {
  ADD_IMAGE,
  LIST_IMAGES,
  DELETE_IMAGE,
  UPDATE_IMAGE,
  LIST_IMAGES_BY_PRODUCT_ID,
} from './ImageTypes';

import axios from 'axios'

import { API } from '@app/shared/const';

const actionAddImage = (images, productId) => async (dispatch) => {
  return await dispatch({
    type: ADD_IMAGE,
    payload: axios.post(`${API}image/product/${productId}`, images),
  })
};

const actionGetImages = () => async (dispatch) => {
  return await dispatch({
    type: LIST_IMAGES,
    payload: axios.get(`${API}images`),
  })
};

const actionGetImagesByProductId = productId => async (dispatch) => {
  return await dispatch({
    type: LIST_IMAGES_BY_PRODUCT_ID,
    payload: axios.get(`${API}images/product`, {
      params: {
        productId,
      },
    }),
  })
};

const actionUpdateImage = (image, id) => async (dispatch) => {
  return await dispatch({
    type: UPDATE_IMAGE,
    payload: axios.put(`${API}image`, image, {
      params: {
        id,
      },
    }),
  })
};

const actionDeleteImage = id => async (dispatch) => {
  return await dispatch({
    type: DELETE_IMAGE,
    payload: axios.delete(`${API}image`, {
      params: {
        id,
      },
    }),
  })
};

export {
  actionAddImage,
  actionGetImages,
  actionUpdateImage,
  actionDeleteImage,
  actionGetImagesByProductId,
}
