import { ADD_TO_CART, CART, ADD_ORDER, UPDATE_ORDER, GET_ORDER, GET_ORDERS } from './CartTypes';
import { REQUEST, FAILURE, SUCCESS } from '@app/configs/ActionType';
const initialState = {
  cartState: [],
  ordersState: [],
  orderDetailState: {},
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_TO_CART: {
      return {
        ...state,
        cartState: action.payload,
      }
    }

    // load cart when user users app
    case CART: {
      return {
        ...state,
        cartState: action.payload,
      }
    }

    case REQUEST(GET_ORDER):
    case FAILURE(GET_ORDER):

    case REQUEST(GET_ORDERS):
    case FAILURE(GET_ORDERS):

    case REQUEST(UPDATE_ORDER):
    case FAILURE(UPDATE_ORDER):
    case SUCCESS(UPDATE_ORDER):

    case REQUEST(ADD_ORDER):
    case FAILURE(ADD_ORDER):
    case SUCCESS(ADD_ORDER): {
      return {
        ...state,
      }
    }

    case SUCCESS(GET_ORDER): {
      return {
        ...state,
        orderDetailState: action.payload.data,
      }
    }

    case SUCCESS(GET_ORDERS): {
      return {
        ...state,
        ordersState: action.payload.data,
      }
    }
    default: return state
  }
}

export default cartReducer
