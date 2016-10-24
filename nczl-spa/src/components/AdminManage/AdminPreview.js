/**
 * Created by admin on 2016/10/13.
 */
import React from 'react'
import $ from 'jquery'
import Card from '../common/Card'
import Button from '../common/Button'
import Table from '../common/Table'
import Pagination from '../common/Pagination'
const iconAdd = require('../../images/icon_add.gif');
class AdminPreview extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      page: {
        rowData:[]
      },
      loading:true
    }
  }

  componentWillMount() {
    this.queryAdminList(1);
  }
  handleQueryAdmin(event){

    event.preventDefault();
    var targetPage = event.currentTarget.getAttribute("data-page");
    this.setState({
      loading:true
    })
    this.queryAdminList(targetPage);
  }
  queryAdminList(targetPage,nameFilter={}){

      $.ajax({
        type: 'GET',
        url:'/nczl-web/rs/admin/list?curPage='+targetPage+'&pageSize='+5,
        dataType:'json',
        success:function(rm){
          if(rm.code==1){
            console.log('debug',rm.result);
            this.setState({
              page:rm.result,
              loading:false
            })
          }
        }.bind(this)
      })

  }
  render() {
    const columns = [{
      title: '用户名',
      dataIndex: 'username',
      width: "39%",
      key: 'username'
    }, {
      title: '状态',
      dataIndex: 'status',
      width: "39%",
      key: 'status'
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: "22%",
      key: 'operation',
      isOptd:true
    }];
    var dataList= this.state.page.rowData ||[];
    var dataSource = dataList.map((admin)=>{
      return {
        id:admin.id,
        username:admin.username,
        status:admin.status==0?"启用":"停用",
        operation:(
          <span>
            <a href="#">{admin.status==0?"停用":"启用"}</a>
            <a href="#">编辑及分配权限</a>
            <a href="#">删除</a>
          </span>
        )
      }
    });
    console.log("loading",this.state.loading)
    return (
      <Card title={<span>管理员管理</span>}>
        <div className="total">
          <span className="xe"><Button prefixCls="add-btn" onClick={this.handleQueryAdmin.bind(this)}><img src={iconAdd}/> 新增</Button></span>管理员名称：
          <input className="input1" type="text"/> <Button>搜索</Button>
        </div>
        <Table dataSource={dataSource} columns={columns} loading={this.state.loading}/>
        <Pagination page={this.state.page} onClick={this.handleQueryAdmin.bind(this)}/>
      </Card>
    )
  }
}
export default AdminPreview;
