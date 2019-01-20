import { ADD_CAT, DELETE_CAT, UPDATE_CAT, LIST_CATS, LIST_CAT_BRAND } from './CatTypes';
import { REQUEST, FAILURE, SUCCESS } from '@app/configs/ActionType';

const initialState = {
  catsState: [],
  catBrandsState: [],
}

const catReducer = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST(ADD_CAT):
    case FAILURE(ADD_CAT):
    case SUCCESS(ADD_CAT):

    case REQUEST(DELETE_CAT):
    case FAILURE(DELETE_CAT):
    case SUCCESS(DELETE_CAT):

    case REQUEST(UPDATE_CAT):
    case FAILURE(UPDATE_CAT):
    case SUCCESS(UPDATE_CAT):

    case REQUEST(LIST_CAT_BRAND):
    case FAILURE(LIST_CAT_BRAND):

    case REQUEST(LIST_CATS):
    case FAILURE(LIST_CATS): {
      return {
        ...state,
      }
    }
    case SUCCESS(LIST_CATS): {
      return {
        ...state,
        catsState: action.payload,
      }
    }

    case SUCCESS(LIST_CAT_BRAND): {
      return {
        ...state,
        catBrandsState: action.payload.data,
      }
    }
    default: return state
  }
}

export default catReducer
