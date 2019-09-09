import { FAILURE, SUCCESS } from '../../configs/ActionType';
import { BlogTypes } from './BlogTypes';
import { REQUEST } from '@app/configs/ActionType';

const initialState = {
  blogsState: [],
  blogState: {},
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(BlogTypes.ADD):
    case FAILURE(BlogTypes.ADD):
    case SUCCESS(BlogTypes.ADD):

    case REQUEST(BlogTypes.DELETE):
    case FAILURE(BlogTypes.DELETE):
    case SUCCESS(BlogTypes.DELETE):

    case REQUEST(BlogTypes.UPDATE):
    case FAILURE(BlogTypes.UPDATE):
    case SUCCESS(BlogTypes.UPDATE):

    case REQUEST(BlogTypes.DETAIL):
    case FAILURE(BlogTypes.DETAIL):

    case REQUEST(BlogTypes.LIST):
    case FAILURE(BlogTypes.LIST): {
      return state
    }
    case SUCCESS(BlogTypes.LIST): {
      return {
        ...state,
        blogsState: action.payload.data,
      }
    }

    case SUCCESS(BlogTypes.DETAIL): {
      return {
        ...state,
        blogState: action.payload.data,
      }
    }

    default: return state
  }
}

export default blogReducer
