/**
 * Created by admin on 2016/10/19.
 */
import React from 'react'
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      userName: "qweqw",
      password: "qq"
    }
  }

  handleLogin(e) {
    e.preventDefault();
    console.log("click-lf")
    this.props.actions.login(this.state.userName);
  }
  handleNameChange(e){
    this.setState({userName: e.target.value});
  }
  handlePasswordChange(e){
    this.setState({password: e.target.value});
  }
  render() {
    return (
      <div className="login-bg">
        <div className="login-modal">
          <form>
            <ul className="loginc">
              <li><input name="" type="text" className="linput1" max="20" defaultValue={this.state.userName}
                         onChange={this.handleNameChange.bind(this)}/><span className="itp">帐号</span></li>
              <li><input name="" type="password" className="linput2" max="20" defaultValue={this.state.password}
                         onChange={this.handlePasswordChange.bind(this)}/><span className="itp">密码</span></li>
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
