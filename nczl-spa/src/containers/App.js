/**
 * Created by admin on 2016/10/19.
 */
import React,{PropTypes} from 'react'
import { connect } from 'react-redux'
import { push as sendRedirect } from 'react-router-redux'
import { bindActionCreators } from 'redux';
import { loginReq,logoutReq,changePasswordReq,checkLoginReq,openModal,closeModal } from '../actions';
import Main from '../components/Main'

class App extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }
    render(){
        const {profile,actions,globalModalOption}=this.props;
        //console.log("App render",this.props)
        return (
         <Main profile={profile} globalModalOption={globalModalOption} actions={actions}>{this.props.children}</Main>
        )
    }
}

function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const {profile,globalModalOption}=state;
  return {profile,globalModalOption};
}

function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = { loginReq,logoutReq,changePasswordReq,checkLoginReq,openModal,closeModal};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
