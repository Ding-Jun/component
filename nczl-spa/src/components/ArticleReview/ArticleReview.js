/**
 * Created by admin on 2016/10/13.
 */
import React from 'react'

class ArticleReview extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }
    render(){
        return (
          <div>{this.props.children}</div>
        )
    }
}
export default ArticleReview;
