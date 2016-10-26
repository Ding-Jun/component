/**
 * Created by admin on 2016/10/17.
 */
import $ from 'jquery'

export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
export const login_query = () =>(dispatch)=> {
  console.log("login_query")
  $.ajax({
    type: 'GET',
    url: `/nczl-web/rs/admin/info`,
    dataType: 'json',
    success: function (rm) {
      console.log("login_query", rm)
      if (rm.code == 1) {
        dispatch(login(rm.data.username))
      }
      else {
        dispatch(logout())
      }
    }
  })
}
export const login = (userName) => ({
  type: LOG_IN,
  payload: userName
})

export const logout = ()=>({
  type: LOG_OUT
})

export const changePassword = (password)=>({
  type: CHANGE_PASSWORD,
  payload: password
})
