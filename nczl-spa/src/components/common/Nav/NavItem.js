/**
 * Created by admin on 2016/10/13.
 */
import React from 'react'
import classnames from 'classnames'
class NavItem extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
  }
  getPrefixCls() {
    return 'nav-item';
  }

  getActiveClassName() {
    return `${this.getPrefixCls()}-active`;
  }

  getSelectedClassName() {
    return `${this.getPrefixCls()}-selected`;
  }

  getDisabledClassName() {
    return `${this.getPrefixCls()}-disabled`;
  }
  isSelected() {
    return false;
  }
  render() {
    const props = this.props;
    const selected = this.isSelected();
    const classes = {};
    classes[this.getActiveClassName()] = !props.disabled && props.active;
    classes[this.getSelectedClassName()] = selected;
    classes[this.getDisabledClassName()] = props.disabled;
    classes[this.getPrefixCls()] = true;
    classes[props.className] = !!props.className;
    const attrs = {
      ...props.attribute,
      title: props.title,
      className: classnames(classes),
      role: 'navitem',
      'aria-selected': selected,
      'aria-disabled': props.disabled
    };
    let mouseEvent = {};
    if (!props.disabled) {
      mouseEvent = {
        onClick: this.onClick,
        onMouseLeave: this.onMouseLeave,
        onMouseEnter: this.onMouseEnter
      };
    }
    const style = {
      ...props.style
    };
    return (
      <li
        style={style}
        {...attrs}
        {...mouseEvent}
      >
        {props.children}
      </li>
    )
  }
}
export default NavItem;
