/**
 * Created by admin on 2016/10/13.
 */

import React from 'react'
import {Link} from 'react-router'
import Logo from '../common/Logo'
import UserInfo from '../common/UserInfo'
let logoImg = require('../../images/logo.png');
class HomeHeader extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }
    render(){
        return (
          <div className="home-header">
            <Logo>
              <Link to="/"><img src={logoImg}/></Link>
            </Logo>
            <UserInfo></UserInfo>
          </div>
        )
    }
}
export default HomeHeader;
