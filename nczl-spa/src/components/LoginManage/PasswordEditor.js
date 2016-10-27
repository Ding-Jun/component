/**
 * Created by admin on 2016/10/19.
 */
import React from 'react'

import Card from '../common/Card'
import Form from '../common/Form'
import Input from '../common/Input'
import Button from '../common/Button'
import Modal from '../common/Modal'
const FormItem = Form.Item;
class PasswordEditor extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
  }
  handleSubmit(e) {
    e.preventDefault();
    const {actions,form}=this.props;
    form.validateFields((errors,values)=>{
      console.log("haha handleSubmit",errors," - ",values);
      if(!errors){
       // this.openModal();
        actions.changePasswordReq(values.password,values.newPassword);
      }
    })
  }

  handleReturn(e){
    e.preventDefault();
    this.props.actions.goBack();
  }
  validateEquals(rule, value, callback) {
    const {getFieldValue}=this.props.form;
    var err = !(getFieldValue('newPassword') == getFieldValue('confirmPassword'))
    if (err) {
      callback(new Error(rule.message));
    }else {
      callback()
    }
    return err;
  }

  render() {
    const {getFieldDecorator,getFieldError,isFiledValidating}=this.props.form
    var passwordProps =getFieldDecorator('password', {
      validate: true,
      rules: [
        {type: 'length', min: '1', message: '原密码不能为空'}
      ]
    })
    var newPasswordProps =getFieldDecorator('newPassword', {
      validate: true,
      rules: [
        {type: 'char-normal', message: '含有非法字符'},
        {type: 'length',min:1,message:'密码不能为空'},
        {type: 'length',min:6,max:16,message:'密码长度为6-16位'}
      ]
    })
    var confirmProps =getFieldDecorator('confirmPassword', {
      validate: true,
      rules: [
        {type: 'function', validate: this.validateEquals.bind(this), message: '两次输入的密码不一致'}
      ]
    })
    return (
      <Card title={<span>密码修改</span>}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem ref="form" label={"原密码："}  error={getFieldError('password')}>
            <Input ref="password" type="password" size="60" {...passwordProps} ></Input>
          </FormItem>
          <FormItem label={"新密码："} help="密码长度在6-16位之间，由字母、数字、下划线组成"
                    error={getFieldError('newPassword')}>
            <Input ref="newPassword" type="password" size="60" {...newPasswordProps}></Input>
          </FormItem>
          <FormItem label={"确认密码："} error={getFieldError('confirmPassword')}>
            <Input ref="confirmPassword" type="password" size="60" {...confirmProps}></Input>
          </FormItem>
          <FormItem >
            <Button  prefixCls="btn_4">保存编辑</Button>
            <Button prefixCls="btn_4" onClick={this.handleReturn.bind(this)}>返回</Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}
PasswordEditor = Form.create()(PasswordEditor);
export default  PasswordEditor;
