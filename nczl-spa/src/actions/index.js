/**
 * Created by admin on 2016/10/17.
 */
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const login = (userName) => ({
  type: LOG_IN,
  payload:userName
})

export const logout=()=>({
  type:LOG_OUT
})
