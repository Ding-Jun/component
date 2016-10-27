import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import modalReducer from './modalReducer'
import { routerReducer } from 'react-router-redux';
const rootReducer = combineReducers({
  routing: routerReducer,
  profile:loginReducer,
  globalModalOption:modalReducer
})

export default rootReducer
