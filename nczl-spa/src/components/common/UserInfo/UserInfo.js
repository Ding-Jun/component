/**
 * Created by admin on 2016/10/13.
 */
import './style'

import React from 'react'

class UserInfo extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }
  getPrefixCls() {
    return 'user-info';
  }
    render(){

        return (
         <div className={this.getPrefixCls()}>
           admin <a href="password.html" >修改密码</a> <a href="#">退出</a>
           {this.props.children}
         </div>
        )
    }
}
export default UserInfo;
