/**
 * Created by admin on 2016/10/13.
 */
import React from 'react'

import Card from '../common/Card'
class ColumnPreview extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }
    render(){
        return (
          <Card title={<span>专栏管理</span>}>
            {this.props.children}
          </Card>
        )
    }
}
export default ColumnPreview;
