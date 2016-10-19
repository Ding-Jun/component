import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import { routerReducer } from 'react-router-redux';
const rootReducer = combineReducers({
  routing: routerReducer,
  profile:loginReducer
})

export default rootReducer
