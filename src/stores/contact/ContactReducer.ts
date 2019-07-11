import { FAILURE, REQUEST, SUCCESS } from '@app/configs/ActionType';
import { ADD_CONTACT, DELETE_CONTACT, GET_CONTACT } from "./ContactTypes";

const initialState = {
    contactsState: [],
}

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST(ADD_CONTACT):
        case FAILURE(ADD_CONTACT):
        case SUCCESS(ADD_CONTACT):

        case REQUEST(DELETE_CONTACT):
        case FAILURE(DELETE_CONTACT):

        case REQUEST(GET_CONTACT):
        case FAILURE(GET_CONTACT): {
            return state;
        }

        case SUCCESS(GET_CONTACT): {
            return {
              ...state,
              contactsState: action.payload.data,
            }
        }

        default: return state;
    }
}



export default contactReducer