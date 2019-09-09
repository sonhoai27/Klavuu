import {
  ADD_BANNER,
  UPDATE_BANNER,
  DELETE_BANNER,
  GET_BANNER,
  GET_BANNERS,
} from './BannerTypes';
import { REQUEST, FAILURE, SUCCESS } from '@app/configs/ActionType';

const initialState = {
  bannerState: {},
  bannersState: [],
}

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST(UPDATE_BANNER):
    case FAILURE(UPDATE_BANNER):
    case SUCCESS(UPDATE_BANNER):

    case REQUEST(DELETE_BANNER):
    case FAILURE(DELETE_BANNER):
    case SUCCESS(DELETE_BANNER):

    case REQUEST(GET_BANNER):
    case FAILURE(GET_BANNER):

    case REQUEST(GET_BANNERS):
    case FAILURE(GET_BANNERS):

    case REQUEST(ADD_BANNER):
    case FAILURE(ADD_BANNER):
    case SUCCESS(ADD_BANNER): {
      return {
        ...state,
      }
    }

    case SUCCESS(GET_BANNER): {
      return {
        ...state,
        bannerState: action.payload.data,
      }
    }

    case SUCCESS(GET_BANNERS): {
      return {
        ...state,
        bannersState: action.payload.data,
      }
    }
    default: return {
      ...state,
    }
  }
}

export default bannerReducer
