/**
 * Created by admin on 2016/10/13.
 */

import React,{PropTypes} from 'react'
import {Link} from 'react-router'
import Logo from '../common/Logo'
import LoginInfo from '../common/LoginInfo'
let logoImg = require('../../images/logo.png');
class HomeHeader extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }
  static PropTypes={
    login:PropTypes.object.isRequired,
    actions:PropTypes.object.isRequired
  }

    render(){
        return (
          <div className="home-header">
            <Logo>
              <Link to="/"><img src={logoImg}/></Link>
            </Logo>
            <LoginInfo profile={this.props.profile} actions={this.props.actions}></LoginInfo>
          </div>
        )
    }
}
export default HomeHeader;
