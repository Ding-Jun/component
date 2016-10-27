import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { goBack } from 'react-router-redux';
import {changePasswordReq,openModal,closeModal} from '../actions'
import {PasswordEditor} from '../components/LoginManage'

class PasswordEditorContainer extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }
    render(){
        return (
         <PasswordEditor actions={this.props.actions}>{this.props.children}</PasswordEditor>
        )
    }
}
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  return {};
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = { changePasswordReq ,goBack,openModal,closeModal};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps,mapDispatchToProps)(PasswordEditor);
