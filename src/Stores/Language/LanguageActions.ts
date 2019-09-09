import axios from 'axios'

import { GET_LANGUAGE, UPDATE_LANGUAGE } from './LanguageTypes';
import { API } from '@app/Shared/Const';

const actionGetLanguage = lng => async (dispatch) => {
  return await dispatch({
    type: GET_LANGUAGE,
    payload: axios.get(`${API}languages/${lng}`),
  })
}

const actionUpdateLanguage = (form, lng) => async (dispatch) => {
  return await dispatch({
    type: UPDATE_LANGUAGE,
    payload: axios.put(`${API}languages/${lng}`, form),
  })
}

export {
  actionGetLanguage,
  actionUpdateLanguage,
}
