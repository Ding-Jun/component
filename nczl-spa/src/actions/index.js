/**
 * Created by admin on 2016/10/17.
 */
export const QUERY_USER_LIST = 'QUERY_USER_LIST'

export const queryUserList = (targetPage=1,payload={}) => ({
  type: QUERY_USER_LIST,
  targetPage:targetPage,
  payload:payload
})
