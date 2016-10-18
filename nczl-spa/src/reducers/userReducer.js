import { QUERY_USER_LIST } from '../actions'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case QUERY_USER_LIST:
      return {
        ...state,
        userList: {name:"liming",age:28}
      }
    default:
      return state
  }
}

export default userReducer
