import { FAILURE } from './../../configs/ActionType';
import { REQUEST, SUCCESS } from '@app/configs/ActionType';
import { AccountTypes } from './AccountActions';

const initialState = {
  accountsState: {},
}

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(AccountTypes.UPDATE_ACCOUNT):
    case FAILURE(AccountTypes.UPDATE_ACCOUNT):
    case SUCCESS(AccountTypes.UPDATE_ACCOUNT):

    case REQUEST(AccountTypes.UPDATE_ACCOUNT_ROLES):
    case FAILURE(AccountTypes.UPDATE_ACCOUNT_ROLES):
    case SUCCESS(AccountTypes.UPDATE_ACCOUNT_ROLES):

    case REQUEST(AccountTypes.DELETE_ACCOUNT_ROLES):
    case FAILURE(AccountTypes.DELETE_ACCOUNT_ROLES):
    case SUCCESS(AccountTypes.DELETE_ACCOUNT_ROLES):

    case REQUEST(AccountTypes.DELETE_ACCOUNT):
    case FAILURE(AccountTypes.DELETE_ACCOUNT):
    case SUCCESS(AccountTypes.DELETE_ACCOUNT):

    case REQUEST(AccountTypes.ADD_ACCOUNT):
    case FAILURE(AccountTypes.ADD_ACCOUNT):
    case SUCCESS(AccountTypes.ADD_ACCOUNT):

    case REQUEST(AccountTypes.GET_ACCOUNT):
    case FAILURE(AccountTypes.GET_ACCOUNT): {
      return state
    }

    case SUCCESS(AccountTypes.GET_ACCOUNT): {
      return {
        ...state,
        accountsState: action.payload.data,
      }
    }

    default: return state
  }
}

export default accountReducer
