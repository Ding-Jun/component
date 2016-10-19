/**
 * Created by admin on 2016/10/19.
 */
import React,{PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { login,logout } from '../actions';
import Main from '../components/Main'

class App extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }

    render(){
        const {profile,actions}=this.props;

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
  const actions = { login ,logout};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
