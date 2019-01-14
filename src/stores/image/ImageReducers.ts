import { SUCCESS } from './../../configs/ActionType';
import {
  ADD_IMAGE,
  DELETE_IMAGE,
  UPDATE_IMAGE,
  LIST_IMAGES,
  LIST_IMAGES_BY_PRODUCT_ID,
} from './ImageTypes';
import { REQUEST, FAILURE } from '@app/configs/ActionType';

const initialState = {
  imagesState: [],
  imageByProductState: [],
}

const imageReducer = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST(ADD_IMAGE):
    case FAILURE(ADD_IMAGE):
    case SUCCESS(ADD_IMAGE):
    case REQUEST(DELETE_IMAGE):
    case FAILURE(DELETE_IMAGE):
    case SUCCESS(DELETE_IMAGE):
    case REQUEST(UPDATE_IMAGE):
    case FAILURE(UPDATE_IMAGE):
    case SUCCESS(UPDATE_IMAGE): {
      return {
        ...state,
      }
    }

    case REQUEST(LIST_IMAGES_BY_PRODUCT_ID):
    case FAILURE(LIST_IMAGES_BY_PRODUCT_ID):
    case SUCCESS(LIST_IMAGES_BY_PRODUCT_ID): {
      return {
        ...state,
        imageByProductState: action.payload,
      }
    }

    case REQUEST(LIST_IMAGES):
    case FAILURE(LIST_IMAGES):
    case SUCCESS(LIST_IMAGES): {
      return {
        ...state,
        imagesState: action.payload,
      }
    }
    default: return state
  }
}

export default imageReducer
