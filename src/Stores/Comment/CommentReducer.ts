import {
  ADD_CMT,
  DELETE_CMT,
  UPDATE_CMT,
  GET_CMT,
  GET_CMT_BY_PRD_ID,
  CHECK_ORDER_ID,
} from './CommentTypes';
import { REQUEST, FAILURE, SUCCESS } from '@app/configs/ActionType';

const initialState = {
  cmtsState: [],
  cmtsByPrdIdState: [],
}

const cmtReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ADD_CMT):
    case FAILURE(ADD_CMT):
    case SUCCESS(ADD_CMT):

    case REQUEST(DELETE_CMT):
    case FAILURE(DELETE_CMT):
    case SUCCESS(DELETE_CMT):

    case REQUEST(UPDATE_CMT):
    case FAILURE(UPDATE_CMT):
    case SUCCESS(UPDATE_CMT):

    case REQUEST(CHECK_ORDER_ID):
    case FAILURE(CHECK_ORDER_ID):
    case SUCCESS(CHECK_ORDER_ID):

    case REQUEST(GET_CMT):
    case FAILURE(GET_CMT):

    case REQUEST(GET_CMT_BY_PRD_ID):
    case FAILURE(GET_CMT_BY_PRD_ID): {
      return {
        ...state,
      }
    }

    case SUCCESS(GET_CMT): {
      return {
        ...state,
        cmtsState: action.payload.data,
      }
    }

    case SUCCESS(GET_CMT_BY_PRD_ID): {
      return {
        ...state,
        cmtsByPrdIdState: action.payload.data,
      }
    }

    default: {
      return state;
    }
  }
}

export default cmtReducer
