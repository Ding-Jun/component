/**
 * Created by admin on 2016/10/17.
 */
import $ from 'jquery'

export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

export const MODAL_OPEN = 'MODAL_OPEN'
export const MODAL_CLOSE = 'MODAL_CLOSE'
export const NO_LOGIN_CODE = 99
export const loginReq=(userName,password)=>(dispatch)=>{
  console.log("loginReq")
  $.ajax({
    type: 'POST',
    url: `/nczl-web/rs/login`,
    dataType: 'json',
    data:{username: userName,password:password},
    success: (rm)=> {
      console.log("loginReq", rm)
      if (rm.code == 1) {
        checkLoginReq()(dispatch)
      }
      else {
        const option={
          title:"信息",
          content:`用户名或密码错误`,
          closable:false,
          onOk:()=>{dispatch(closeModal())}
        }
        dispatch(openModal(option));
       // dispatch(logout())
      }
    },
    error:(e)=>{
      console.log(e)
      const option={
        title:"信息",
        content:`服务器连接失败 状态${e.status+": "+e.statusText } `,
        closable:false,
        onOk:()=>{dispatch(closeModal())}
      }
      dispatch(openModal(option));
    }
  })
}
export const logoutReq=()=>(dispatch)=>{
  $.ajax({
    type: 'POST',
    url: `/nczl-web/rs/logout`,
    dataType: 'json',
    success:  (rm) =>{
      console.log("logoutReq", rm)
      if (rm.code == NO_LOGIN_CODE) {
        dispatch(logout())
      }
    }
  })
}
export const checkLoginReq = () =>(dispatch)=> {
  console.log("checkLoginReq")
  $.ajax({
    type: 'GET',
    url: `/nczl-web/rs/admin/info`,
    dataType: 'json',
    success: (rm)=> {
      console.log("checkLoginReq", rm)
      if (rm.code == 1) {
        dispatch(login(rm.data.username))
      }
      else {
        dispatch(logout())
      }
    }
  })
}
export const changePasswordReq=(oldpassword,newpassword)=>(dispatch)=>{
  console.log("changePasswordReq")
  $.ajax({
    type: 'POST',
    url: `/nczl-web/rs/admin/modifyPwd`,
    dataType: 'json',
    data:{oldpassword: oldpassword,newpassword:newpassword},
    success:  (rm)=> {
      console.log("changePasswordReq", rm)
      const option={
        title:"信息",
        content:"密码修改成功，请重新登录",
        closable:false,
        onOk:()=>{dispatch(closeModal())}
      }
      if(rm.code==NO_LOGIN_CODE){
        dispatch(openModal(option));
        dispatch(logout());
      }
      else {

        option.content=rm.message;
        dispatch(openModal(option));
      }
    },
    error:(e)=>{
      console.log(e)
      const option={
        title:"信息",
        content:`服务器连接失败 状态${e.status+": "+e.statusText } `,
        closable:false,
        onOk:()=>{dispatch(closeModal())}
      }
      dispatch(openModal(option));
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

export const openModal=(option)=>({
  type:MODAL_OPEN,
  payload:option
})
export const closeModal=()=>({
  type:MODAL_CLOSE
})

