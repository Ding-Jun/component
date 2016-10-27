/**
 * Created by admin on 2016/10/19.
 */
import React from 'react'
import Input from '../common/Input'
import {getDefaultOption} from '../common/Modal'
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      userName: "",
      password: ""
    }
  }

  handleLogin(e) {
    e.preventDefault();
    const {loginReq,openModal,closeModal} =this.props.actions;
  var modalOption=getDefaultOption();
    var {userName,password}=this.state;
    if(!userName){
      modalOption.content='账号不能为空';
      modalOption.onOk=closeModal;
      openModal(modalOption);
      return
    }
    if(!password){
      modalOption.content='密码不能为空';
      modalOption.onOk=closeModal;
      openModal(modalOption);
      return
    }
    loginReq(userName,password);
    //this.props.actions.sendRedirect('/');
  }

  handleFieldChange(e) {
    const {name,value}=e.target;
    this.setState({[name]: value});
  }


  render() {
    return (
      <div className="login-bg">
        <div className="login-modal">
          <form>
            <ul className="loginc">
              <li><Input name="userName" type="text" prefixCls="linput1" max="20" value={this.state.userName}
                         onChange={this.handleFieldChange.bind(this)} validate={false} focus/>
                <span className="itp">{this.state.userName == "" ? '帐号' : ''}</span>
              </li>
              <li><Input name="password" type="password" prefixCls="linput2" max="20" value={this.state.password}
                         onChange={this.handleFieldChange.bind(this)}/>
                <span className="itp">{this.state.password == "" ? '密码' : ''}</span>
              </li>
            </ul>
            <div className="loginbtn"><input name="" type="submit" className="lbtn" value="管理员登录"
                                             onClick={this.handleLogin.bind(this)}/></div>
          </form>
        </div>

        <div className="login-copyright">
          读书会 ® All right reserved
        </div>
      </div>
    )
  }
}
export default LoginForm;
