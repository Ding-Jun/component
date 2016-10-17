/**
 * Created by admin on 2016/10/13.
 */
import React from 'react'
import classnames from 'classnames'
class Nav extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }
  getPrefixCls() {
    return 'nav';
  }
    render(){
      const props = { ...this.props };
      const classes = {};
      classes[this.getPrefixCls()] = true;
      classes[props.className] = !!props.className;
      props.className = classnames(classes);
        return (
         <ul {...props}>{props.children}</ul>
        )
    }
}
export default Nav;
