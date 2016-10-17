/**
 * Created by admin on 2016/10/13.
 */
import React from 'react'
class HomeContent extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }
    render(){
        return (
         <div className="home-content">{this.props.children}</div>
        )
    }
}
export default HomeContent;
