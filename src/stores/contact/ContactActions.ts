import axios from 'axios'
import { API } from '@app/shared/const';

import { ADD_CONTACT, GET_CONTACT, DELETE_CONTACT } from './ContactTypes';

const actionAddContact = (form) => async (dispatch) => {
    return await dispatch({
        type: ADD_CONTACT,
        payload: axios.post(`${API}contacts`, form)
    })
}

const actionGetContacts = (query = '') => async (dispatch) => {
    return await dispatch({
      type: GET_CONTACT,
      payload: axios.get(`${API}contacts${query}`),
    })
}

const actionDeleteContact = (id: number) => async (dispatch) => {
    return await dispatch({
      type: DELETE_CONTACT,
      payload: axios.delete(`${API}contacts/${id}`),
    })
}

export {
    actionDeleteContact,
    actionGetContacts,
    actionAddContact
}