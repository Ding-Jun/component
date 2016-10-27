/**
 * Created by admin on 2016/10/13.
 */
import React from 'react'
import $ from 'jquery'
import HomeHeader from './HomeHeader'
import HomeNav from './HomeNav'
import HomeContent from './HomeContent'
import Modal from '../common/Modal'
import {LoginForm} from '../LoginManage'
class Home extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }
    componentWillMount(){
        //this.actions.login_query()
    }
    render(){
      const {profile,actions,globalModalOption}=this.props;
      //console.log('globalModalOption',globalModalOption);
      //console.log('acitons',actions);
      var elem=<LoginForm actions={actions}/>
      //profile.isLogin=true; //no login   for debug
      if(profile.isLogin){
      //if(profile.isLogin){
        elem=<div className="home-view">
          <HomeHeader profile={profile} actions={actions}/>
          <HomeNav/>
          <HomeContent >{this.props.children}</HomeContent>

        </div>
      }
        return (
          <div>
            {elem}
            <Modal {...globalModalOption}></Modal>
          </div>

        )
    }
}
export default Home;
