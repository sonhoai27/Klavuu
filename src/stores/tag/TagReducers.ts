import { SUCCESS } from './../../configs/ActionType';
import { ADD_TAG, LIST_TAGS, DELETE_TAG, UPDATE_TAG } from './TagTypes';
import { REQUEST, FAILURE } from '@app/configs/ActionType';

const initialState = {
  tagsState: [],
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
    case FAILURE(LIST_TAGS): {
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
    default: return state
  }
}

export default tagReducer
