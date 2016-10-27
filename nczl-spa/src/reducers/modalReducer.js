/**
 * Created by admin on 2016/10/27.
 */
import {MODAL_OPEN, MODAL_CLOSE} from '../actions'

const initialState = {
  visible: false
};


const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        ...state,
        ...action.payload,
        visible:true
      }
    case MODAL_CLOSE:
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default modalReducer
