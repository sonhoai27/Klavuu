import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  LIST_PRODUCTS,
  ADD_BRAND_CAT,
  ADD_TAG_PRODUCT, GET_PRODUCT_BY_ALIAS,
} from './ProductTypes';
import { REQUEST, FAILURE, SUCCESS } from '@app/configs/ActionType';

const initialState = {
  productsState: [],
  productState: {},
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST(ADD_PRODUCT):
    case FAILURE(ADD_PRODUCT):
    case SUCCESS(ADD_PRODUCT):

    case REQUEST(DELETE_PRODUCT):
    case FAILURE(DELETE_PRODUCT):
    case SUCCESS(DELETE_PRODUCT):

    case REQUEST(UPDATE_PRODUCT):
    case FAILURE(UPDATE_PRODUCT):
    case SUCCESS(UPDATE_PRODUCT):

    case REQUEST(LIST_PRODUCTS):
    case FAILURE(LIST_PRODUCTS): {
      return {
        ...state,
      }
    }

    case REQUEST(ADD_BRAND_CAT):
    case FAILURE(ADD_BRAND_CAT): {
      return {
        ...state,
      }
    }

    case REQUEST(ADD_TAG_PRODUCT):
    case FAILURE(ADD_TAG_PRODUCT): {
      return {
        ...state,
      }
    }

    case REQUEST(GET_PRODUCT_BY_ALIAS):
    case FAILURE(GET_PRODUCT_BY_ALIAS): {
      return {
        ...state,
      }
    }
    case SUCCESS(LIST_PRODUCTS): {
      return {
        ...state,
        productsState: action.payload,
      }
    }

    case SUCCESS(GET_PRODUCT_BY_ALIAS): {
      return {
        ...state,
        productState: action.payload.data,
      }
    }
    default: return state
  }
}

export default productReducer
