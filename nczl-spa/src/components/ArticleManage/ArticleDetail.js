/**
 * Created by admin on 2016/10/13.
 */
import React from 'react'
import Card from '../common/Card'

class ArticleDetail extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
      this.state={
        readOnly:this.props.readOnly||false
      }
    }
    render(){
      const readOnly=this.state.readOnly;
      console.log(this.props.params.type,this.props.params.id);
        return (
          <Card title={<span>{readOnly?'文章详细':'文章编辑'}</span>}>
            {this.props.children}
          </Card>
        )
    }
}
export default ArticleDetail;
