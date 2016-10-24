/**
 * Created by admin on 2016/10/19.
 */
import React from 'react'
import Input from '../common/Input'
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

    this.props.actions.login(this.state.userName,this.state.password);
    this.props.actions.sendRedirect('/');
  }

  handleNameChange(value) {
    this.setState({userName: value});
  }

  handlePasswordChange(value) {
    this.setState({password:value});
  }

  render() {
    return (
      <div className="login-bg">
        <div className="login-modal">
          <form>
            <ul className="loginc">
              <li><Input name="" type="text" prefixCls="linput1" max="20" value={this.state.userName}
                         afterChange={this.handleNameChange.bind(this)} validate={false} focus/>
                <span className="itp">{this.state.userName == "" ? '帐号' : ''}</span>
              </li>
              <li><Input name="" type="password" prefixCls="linput2" max="20" value={this.state.password}
                         afterChange={this.handlePasswordChange.bind(this)}/>
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
