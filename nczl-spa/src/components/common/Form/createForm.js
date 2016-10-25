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
        this.fields=this.fields||{};
        this.fields[id]= this.fields[id]||{};
        if(this.fields[id].value===undefined){this.fields[id].value= options.initialValue||''};
        this.fields[id].rules=this.fields[id].rules||options.rules;
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
        if(field.rules && field.rules.length>0){
          field.errors=[];
          field.validating=true;
          field.key=uuid();
          Validator.validate(field.rules,value, this.setFeildError.bind(this,name,field.key));
        }
      }

      /**
       * 提交前的验证    未完成
       * @param callBack    callBack(errors,values)
       */
      validateFields(callBack){
        var values={};
        for(var name in this.fields){
          console.log("debug", name)
          if(typeof name !== "function"){
            values[name]=this.fields[name].value;
            /**do later*/
            }


        }
        callBack(null,values)
      }
      getFieldValue(name){
        return this.fields[name].value;
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
          if(errors.length==field.rules.length){
            field.validating=false;
            this.setState({key:uuid()}) //验证完成后强制刷新View 目前没想到更好的办法
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
            return errors[i];
          }
        }
        return null;
      }
      render() {


        const formProps={
          form:{
            getFieldDecorator:this.getFieldDecorator.bind(this),
            validateField:this.validateField.bind(this),
            isFieldValidating:this.isFieldValidating.bind(this),
            getFieldError:this.getFieldError.bind(this),
            getFieldValue:this.getFieldValue.bind(this),
            validateFields:this.validateFields.bind(this)
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
