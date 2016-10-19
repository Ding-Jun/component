import {LOG_IN, LOG_OUT} from '../actions'


const initialState = {
  isLogin: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLogin: true,
        name: action.payload
      }
    case LOG_OUT:
      return {
        ...state,
        isLogin: false,
        name: null
      }
    default:
      return state
  }
}

export default loginReducer
