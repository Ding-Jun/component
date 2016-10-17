/**
 * Created by admin on 2016/10/14.
 */
import React from 'react'
import classnames from 'classnames'
import './style'
class Button extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }
  static defaultProps = {
    prefixCls: 'btn',
    onClick() {},
    loading: false,
  };
  static propTypes = {
    type: React.PropTypes.string,
    htmlType: React.PropTypes.oneOf(['submit', 'button', 'reset']),
    onClick: React.PropTypes.func,
    loading: React.PropTypes.bool,
    className: React.PropTypes.string,
    title:React.PropTypes.node
  };

  handleClick = (e) => {
    this.props.onClick(e);
  }
    render(){
      const props = this.props;
      const prefixCls=props.prefixCls;
      const className=props.className;
      const classes = classnames({
        [prefixCls]: true,
        [`${prefixCls}-text`]: true,
        [`${prefixCls}-loading`]: props.loading,
        [className]: props.className,
      });
        return (
         <a className={classes} onClick={this.handleClick} style={props.style}>

           {this.props.children}

         </a>
        )
    }
}
export default Button;
