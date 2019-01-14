import { ADD_BRAND, DELETE_BRAND, UPDATE_BRAND, LIST_BRANDS } from './BrandTypes';
import { SUCCESS } from './../../configs/ActionType';
import { REQUEST, FAILURE } from '@app/configs/ActionType';

const initialState = {
  brandsState: [],
}

const brandReducer = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST(ADD_BRAND):
    case FAILURE(ADD_BRAND):
    case SUCCESS(ADD_BRAND):

    case REQUEST(DELETE_BRAND):
    case FAILURE(DELETE_BRAND):
    case SUCCESS(DELETE_BRAND):

    case REQUEST(UPDATE_BRAND):
    case FAILURE(UPDATE_BRAND):
    case SUCCESS(UPDATE_BRAND):

    case REQUEST(LIST_BRANDS):
    case FAILURE(LIST_BRANDS): {
      return {
        ...state,
      }
    }
    case SUCCESS(LIST_BRANDS): {
      return {
        ...state,
        brandsState: action.payload,
      }
    }
    default: return state
  }
}

export default brandReducer
