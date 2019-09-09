import { GET_LANGUAGE, UPDATE_LANGUAGE } from './LanguageTypes';
import { REQUEST, FAILURE, SUCCESS } from '@app/configs/ActionType';

const initialState = {
  languageState: [],
}

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(UPDATE_LANGUAGE):
    case FAILURE(UPDATE_LANGUAGE):
    case SUCCESS(UPDATE_LANGUAGE):

    case REQUEST(GET_LANGUAGE):
    case FAILURE(GET_LANGUAGE): {
      return {
        ...state,
      }
    }

    case SUCCESS(GET_LANGUAGE): {
      return {
        ...state,
        languageState: action.payload.data,
      }
    }

    default: {
      return state
    }
  }
}

export default languageReducer
