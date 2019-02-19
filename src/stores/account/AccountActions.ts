import axios from 'axios'

import { API } from '@app/shared/const';
const AccountTypes = {
  GET_ACCOUNT: 'ACCOUNTS/GET_ACCOUNT',
  ADD_ACCOUNT: 'ACCOUNT/ADD_ACCOUNT',
  DELETE_ACCOUNT: 'ACCOUNT/DELETE_ACCOUNT',
  UPDATE_ACCOUNT: 'ACCOUNT/UPDATE_ACCOUNT',
  UPDATE_ACCOUNT_ROLES: 'ACCOUNT/UPDATE_ACCOUNT_ROLES',
  DELETE_ACCOUNT_ROLES: 'ACCOUNT/DELETE_ACCOUNT_ROLES',
}

const actionGetAccounts = () => async (dispatch) => {
  return dispatch({
    type: AccountTypes.GET_ACCOUNT,
    payload: axios.get(`${API}auth/accounts`),
  })
}

const actionDeleteAccount = id => async (dispatch) => {
  return dispatch({
    type: AccountTypes.DELETE_ACCOUNT,
    payload: axios.delete(`${API}auth/accounts/${id}`),
  })
}

const actionUpdateAccount = (form, id) => async (dispatch) => {
  return dispatch({
    type: AccountTypes.UPDATE_ACCOUNT,
    payload: axios.put(`${API}auth/accounts/${id}`, form),
  })
}

const actionDeleteAccountRoles = id => async (dispatch) => {
  return dispatch({
    type: AccountTypes.DELETE_ACCOUNT_ROLES,
    payload: axios.delete(`${API}auth/account-roles/${id}`),
  })
}

const actionUpdateAccountRoles = (form, id) => async (dispatch) => {
  return dispatch({
    type: AccountTypes.UPDATE_ACCOUNT_ROLES,
    payload: axios.put(`${API}auth/account-roles/${id}`, form),
  })
}

const actionAddAccount = form => async (dispatch) => {
  return dispatch({
    type: AccountTypes.ADD_ACCOUNT,
    payload: axios.post(`${API}auth/accounts`, form),
  })
}

export {
  AccountTypes,
  actionGetAccounts,
  actionDeleteAccount,
  actionUpdateAccount,
  actionAddAccount,
  actionUpdateAccountRoles,
  actionDeleteAccountRoles,
}
