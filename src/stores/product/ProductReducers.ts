import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  LIST_PRODUCTS,
  ADD_BRAND_CAT,
  ADD_TAG_PRODUCT,
  GET_PRODUCT_BY_ALIAS,
  GET_TAG_PRODUCT,
  DELETE_TAG_PRODUCT,
  GET_PRODUCTS_FILTER,
} from './ProductTypes';
import { REQUEST, FAILURE, SUCCESS } from '@app/configs/ActionType';

const initialState = {
  productsState: [],
  productState: {},
  tagsProductsState: [],
  productsFilterState: [],
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
    case FAILURE(LIST_PRODUCTS):

    case REQUEST(ADD_BRAND_CAT):
    case FAILURE(ADD_BRAND_CAT):

    case REQUEST(ADD_TAG_PRODUCT):
    case FAILURE(ADD_TAG_PRODUCT):

    case REQUEST(GET_TAG_PRODUCT):
    case FAILURE(GET_TAG_PRODUCT):

    case REQUEST(DELETE_TAG_PRODUCT):
    case FAILURE(DELETE_TAG_PRODUCT):

    case REQUEST(GET_PRODUCTS_FILTER):
    case FAILURE(GET_PRODUCTS_FILTER):

    case REQUEST(GET_PRODUCT_BY_ALIAS):
    case FAILURE(GET_PRODUCT_BY_ALIAS): {
      return {
        ...state,
      }
    }

    case SUCCESS(GET_TAG_PRODUCT): {
      return {
        ...state,
        tagsProductsState: action.payload.data,
      }
    }

    case SUCCESS(LIST_PRODUCTS): {
      return {
        ...state,
        productsState: action.payload.data,
      }
    }

    case SUCCESS(GET_PRODUCT_BY_ALIAS): {
      return {
        ...state,
        productState: action.payload.data,
      }
    }

    case SUCCESS(GET_PRODUCTS_FILTER): {
      return {
        ...state,
        productsFilterState: action.payload.data,
      }
    }
    default: return state
  }
}

export default productReducer
