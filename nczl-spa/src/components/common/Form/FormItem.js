/**
 * Created by admin on 2016/10/19.
 */
import React from 'react'
import './style'
class FormItem extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }
  static defaultProps={
    prefixCls:'form-item',
    style:{},
    onSubmit(e){e.preventDefault();}
  }
    render(){
      const {prefixCls,style,className,label}=this.props;

        return (
        <tr style={style} className={className}>
          <td className={`${prefixCls}-label`}>{label}</td>
          <td className={`${prefixCls}-content`}>{this.props.children}</td>
        </tr>
        )
    }
}
export default FormItem;
