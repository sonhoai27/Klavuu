import { ADD_BRAND, DELETE_BRAND, UPDATE_BRAND, LIST_BRANDS, LIST_BRAND_TAG } from './BrandTypes';
import { SUCCESS } from '../../configs/ActionType';
import { REQUEST, FAILURE } from '@app/configs/ActionType';

const initialState = {
  brandsState: [],
  brandTagsState: [],
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

    case FAILURE(LIST_BRAND_TAG):
    case REQUEST(LIST_BRAND_TAG):

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

    case SUCCESS(LIST_BRAND_TAG): {
      return {
        ...state,
        brandTagsState: action.payload.data,
      }
    }
    default: return state
  }
}

export default brandReducer
