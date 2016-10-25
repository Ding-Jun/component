/**
 * Created by admin on 2016/10/25.
 */
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { goBack } from 'react-router-redux';
import {ArticleDetail} from '../components/ArticleManage'

class ArticleDetailContainer extends React.Component{
  constructor(props){
    super(props);
    // Operations usually carried out in componentWillMount go here
  }
  render(){
    return (
      <ArticleDetail actions={this.props.actions} params={this.props.params}>{this.props.children}</ArticleDetail>
    )
  }
}
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  return {};
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = { goBack};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps,mapDispatchToProps)(ArticleDetailContainer);
