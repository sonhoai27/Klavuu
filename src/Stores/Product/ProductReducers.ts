import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  LIST_PRODUCTS,
  ADD_BRAND_TAG,
  ADD_TAG_PRODUCT,
  GET_PRODUCT_BY_ALIAS,
  GET_TAG_PRODUCT,
  DELETE_TAG_PRODUCT,
  GET_PRODUCTS_FILTER,
  GET_PROVINCE,
  GET_DISTRICT,
  GET_WARD,
  GET_NEW_PRODUCT,
} from './ProductTypes';
import { REQUEST, FAILURE, SUCCESS } from '@app/configs/ActionType';

const initialState = {
  productsState: [],
  productState: {
    items: [],
    meta: null,
  },
  tagsProductsState: [],
  productsFilterState: [],
  provinceState: [],
  districtState: [],
  wardState: [],
  newProductsState: [],
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

    case REQUEST(ADD_BRAND_TAG):
    case FAILURE(ADD_BRAND_TAG):
    case SUCCESS(ADD_BRAND_TAG):

    case REQUEST(ADD_TAG_PRODUCT):
    case FAILURE(ADD_TAG_PRODUCT):
    case SUCCESS(ADD_TAG_PRODUCT):

    case REQUEST(GET_TAG_PRODUCT):
    case FAILURE(GET_TAG_PRODUCT):

    case REQUEST(DELETE_TAG_PRODUCT):
    case FAILURE(DELETE_TAG_PRODUCT):
    case SUCCESS(DELETE_TAG_PRODUCT):

    case REQUEST(GET_PRODUCTS_FILTER):
    case FAILURE(GET_PRODUCTS_FILTER):

    case REQUEST(GET_PROVINCE):
    case FAILURE(GET_PROVINCE):

    case REQUEST(GET_DISTRICT):
    case FAILURE(GET_DISTRICT):

    case REQUEST(GET_WARD):
    case FAILURE(GET_WARD):

    case REQUEST(GET_NEW_PRODUCT):
    case FAILURE(GET_NEW_PRODUCT):

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

    case SUCCESS(GET_PROVINCE): {
      return {
        ...state,
        provinceState: action.payload.data,
        districtState: [],
      }
    }

    case SUCCESS(GET_DISTRICT): {
      return {
        ...state,
        districtState: action.payload.data,
        wardState: [],
      }
    }

    case SUCCESS(GET_WARD): {
      return {
        ...state,
        wardState: action.payload.data,
      }
    }

    case SUCCESS(GET_NEW_PRODUCT): {
      return {
        ...state,
        newProductsState: action.payload.data,
      }
    }

    default: return state
  }
}

export default productReducer
