/**
 * Created by admin on 2016/10/19.
 */
import React from 'react'
import classnames from 'classnames'
import './style'
import FormItem from './FormItem'
class Form extends React.Component{
    constructor(props){
      super(props);
      // Operations usually carried out in componentWillMount go here
    }
    static defaultProps={
      prefixCls:'form',
      style:{},
      onSubmit(){}
    }
    static Item=FormItem;
    render(){
      const {prefixCls,style,className}=this.props;
      const classes = classnames({
        [prefixCls]: true,
        [`${prefixCls}-table`]: true,
        [className]: !!className,
      });

        return (
         <form onSubmit={this.props.onSubmit}>
           <table style={style} className={classes} cellSpacing={0} cellPadding={0}>
             <tbody>
             {this.props.children}
             </tbody>
           </table>
         </form>
        )
    }
}
export default Form;
