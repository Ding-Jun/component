/**
 * Created by admin on 2016/10/13.
 */
import React from 'react'

import HomeHeader from './HomeHeader'
import HomeNav from './HomeNav'
import HomeContent from './HomeContent'
class Home extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }
    render(){
        return (
         <div className="home-view">
           <HomeHeader/>
           <HomeNav/>
           <HomeContent >{this.props.children}</HomeContent>
         </div>
        )
    }
}
export default Home;
