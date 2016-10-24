/**
 * Created by admin on 2016/10/13.
 */
import React from 'react'

import HomeHeader from './HomeHeader'
import HomeNav from './HomeNav'
import HomeContent from './HomeContent'
import {LoginForm} from '../LoginManage'
class Home extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }
    render(){
      const {profile,actions}=this.props;
      var elem=<LoginForm actions={actions}/>
      //profile.isLogin=true; //no login   for debug
      if(profile.isLogin){
        elem=<div className="home-view">
          <HomeHeader profile={profile} actions={actions}/>
          <HomeNav/>
          <HomeContent >{this.props.children}</HomeContent>
        </div>
      }
        return (
          <div>
            {elem}
          </div>

        )
    }
}
export default Home;
