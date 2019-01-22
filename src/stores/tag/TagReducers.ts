import { SUCCESS } from './../../configs/ActionType';
import {
  ADD_TAG,
  LIST_TAGS,
  DELETE_TAG,
  UPDATE_TAG,
  LIST_TAG_BRANDS,
  LIST_TAGS_FOR_MENU,
} from './TagTypes';
import { REQUEST, FAILURE } from '@app/configs/ActionType';

const initialState = {
  tagsState: [],
  tagBrandsState: [],
  tagsForMenuState: [],
}

const tagReducer = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST(ADD_TAG):
    case FAILURE(ADD_TAG):
    case SUCCESS(ADD_TAG):

    case REQUEST(DELETE_TAG):
    case FAILURE(DELETE_TAG):
    case SUCCESS(DELETE_TAG):

    case REQUEST(UPDATE_TAG):
    case FAILURE(UPDATE_TAG):
    case SUCCESS(UPDATE_TAG):

    case REQUEST(LIST_TAGS):
    case FAILURE(LIST_TAGS):

    case REQUEST(LIST_TAGS_FOR_MENU):
    case FAILURE(LIST_TAGS_FOR_MENU):

    case REQUEST(LIST_TAG_BRANDS):
    case FAILURE(LIST_TAG_BRANDS): {
      return {
        ...state,
      }
    }
    case SUCCESS(LIST_TAGS): {
      return {
        ...state,
        tagsState: action.payload,
      }
    }
    case SUCCESS(LIST_TAG_BRANDS): {
      return {
        ...state,
        tagBrandsState: action.payload.data,
      }
    }
    case SUCCESS(LIST_TAGS_FOR_MENU): {
      return {
        ...state,
        tagsForMenuState: action.payload.data,
      }
    }
    default: return state
  }
}

export default tagReducer
