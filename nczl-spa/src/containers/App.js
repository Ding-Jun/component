/**
 * Created by admin on 2016/10/19.
 */
import React,{PropTypes} from 'react'
import { connect } from 'react-redux'
import { push as sendRedirect } from 'react-router-redux'
import { bindActionCreators } from 'redux';
import { login_query,logout } from '../actions';
import Main from '../components/Main'

class App extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }
  componentWillMount(){
    console.log(this.props.actions.login_query);
    console.log("app componentWillMount")
  }
    render(){
        const {profile,actions}=this.props;
        console.log("app render")
        return (
         <Main profile={profile} actions={actions}>{this.props.children}</Main>
        )
    }
}

function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const {profile}=state;
  return {profile};
}

function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = { login_query ,logout,sendRedirect};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
