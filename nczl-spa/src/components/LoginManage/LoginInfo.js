/**
 * Created by admin on 2016/10/13.
 */


import React from 'react'
import {Link} from 'react-router'
class UserInfo extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }
  getPrefixCls() {
    return 'login-info';
  }
  static propTypes={
    profile:React.PropTypes.object,
    action :React.PropTypes.object
  }
  handleLogin(event){
    event.preventDefault();
    //this.props.actions.login("lissi");
  }
  handleLogout(e){
    e.preventDefault();
    this.props.actions.logout();
  }
    render(){
        const {isLogin,name}=this.props.profile;
      var elem=<a href="#" onClick={this.handleLogin.bind(this)}>login</a>
      if(isLogin){
        elem=<span>{name} <Link to="/password">修改密码</Link> <a href="#" onClick={this.handleLogout.bind(this)}>退出</a></span>
      }
        return (
         <div className={this.getPrefixCls()}>
           {elem}
           {this.props.children}
         </div>
        )
    }
}
export default UserInfo;
