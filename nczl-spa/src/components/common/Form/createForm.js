/**
 * Created by admin on 2016/10/24.
 */
import React from 'react';
import Validator from '../Validator'
import {uuid} from '../util'

//2016年10月24日14:29:28  暂停
/**
 * React High Order Component   For Form
 * @param options  暂时没用
 */
function createForm(options) {
  function decorate(WrappedComponent) {
    class InnerComponent extends React.Component {
      constructor(props){
        super(props);
        this.fields={};
          // Operations usually carried out in componentWillMount go here
        this.state={

        }
      }
      /**
       *记录值 绑定表单项onClick事件
       * @param id
       * @param options
       */
      getFieldDecorator(id,options){
        this.fields[id]= this.fields[id]||{};
        this.fields[id].value=options.initialValue||'';
        this.fields[id].rules=options.rules;
        return {
          id:id,
          onChange:this.onChangeValidate.bind(this,id)
        }
      }
      onChangeValidate(name,event){
          const value = event.target.value;
        this.validateField(name,value);
      }

      /**
       * 验证表单项
       * @param name
       * @param value
       */
      validateField(name,value){
        var field =this.fields[name];
        field.value=value;
        if(field.rules && field.length>0){
          field.errors=[];
          field.validating=true;
          field.key=uuid();
          Validator.validate(field.rules,value, this.setFeildError.bind(this,name,key));
        }
      }

      /**
       * 添加错误
       * @param name
       * @param key
       * @param error
       */
      setFeildError(name,key,error){
        var field =this.fields[name];
        //if equal push
        if(key ==field.key){
          var errors = field.errors||[];
          errors.push(error);
          if(error.length==field.rules.length){
            field.validating=false;
          }
        }
        //if not equal ,drop the error
      }
      isFieldValidating(name){
        return this.fields[name].validating;
      }
      /**
       * 返回第一个错误信息
       * @param name
       * @returns {*}
       */
      getFieldError(name){
        var errors =this.fields[name].errors||[];
        for(var i=0;i<errors.length;i++){
          if(errors[i]){
            return errors[i].message;
          }
        }
      }
      render() {
        const aa=[
          this.getFieldDecorator.bind(this),
          tihs.isFieldValidating.bind(this)
        ]
        const formProps={
          form:{

          }
        }
        const props={
          ...this.props,
          ...formProps
        }
        return <WrappedComponent {...props}/>
      }
    }

    return InnerComponent;
  }

  return decorate;
}


export default createForm;
