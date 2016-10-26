/**
 * Created by admin on 2016/10/13.
 */
import React from 'react'
import $ from 'jquery'
import {Link} from "react-router"
import Card from '../common/Card'
import Table from '../common/Table'
import Button from '../common/Button'
import Pagination from '../common/Pagination'
import Modal from '../common/Modal'
import Input from '../common/Input'

const iconAdd = require('../../images/icon_add.gif');
class ColumnPreview extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      page: {
        rowData: []
      },
      loading: true,
      modal: {
        visible: false
      }
    }
  }

  componentWillMount() {
    console.log('degbu',this.props.params.targetPage)
    this.queryColumnList(this.props.params.targetPage);
  }

  handleQueryColumn(event) {

    event.preventDefault();
    var targetPage = event.currentTarget.getAttribute("data-page");
    this.setState({
      loading: true
    })
    this.queryColumnList(targetPage);
  }

  queryColumnList(targetPage, nameFilter = {}) {
    console.log("targetPagdde",targetPage)
    var url='/nczl-web/rs/column/list?curPage=' + targetPage + '&pageSize=' + 20;
    console.log("uuuusrl",url)
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      success: function (rm) {
        console.log('queryColumnList debug', rm.result);
        if (rm.code == 1) {
          this.setState({
            page: rm.result,
            loading: false
          })
        }
      }.bind(this)
    })
  }

  handleEdit(e) {
    e.preventDefault();
    const  elem=e.currentTarget;
    this.openModal(elem.getAttribute("data-type"),elem.getAttribute("data-id"),elem.getAttribute("data-name"));
  }
  handleDelete(e){
    e.preventDefault();
    console.log("delete",e.currentTarget.getAttribute("data-id"))
  }
  handleInputChange(e){
    e.preventDefault();
    var modal = this.state.modal;
    modal.inputValue=e.target.value;
    this.setState({
      modal:modal
    })
  }
  handleEditConfirm() {
    var url=`/nczl-web/rs/column/${this.state.modal.type}?columnName=${this.state.modal.inputValue}`;
    if(this.state.modal.type=='edit'){
      url+=`&id=${this.state.modal.id}`;
    }
    $.ajax({
      type: 'POST',
      url:url,
      dataType: 'json',
      success: function (rm) {
        if (rm.code == 1) {
          console.log('debug', rm.result);
          this.queryColumnList(1);
          this.closeModal();

        }
      }.bind(this)
    })

  }

  openModal(type, columnId,columnName) {
    switch (type) {
      case 'add':
        this.setState({modal: {visible: true,type:'add', title: '新增分类',id:null,inputValue:""}});
        break;
      case 'edit':
        this.setState({modal: {visible: true,type:'edit', title: '编辑分类',id:columnId,inputValue:columnName}});
        break;
      default:console.warn('no such type')
    }

  }

  closeModal() {
    this.setState({modal: {visible: false}});
  }

  render() {
    const columns = [{
      title: '分类名称',
      dataIndex: 'columnName',
      width: "46%",
      key: 'columnName'
    }, {
      title: '下属文章数',
      dataIndex: 'articleCnt',
      width: "42%",
      key: 'articleCnt',
      isOptd: true
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: "12%",
      key: 'operation',
      isOptd: true
    }];
    var dataList = this.state.page.rowData || [];
    var dataSource = dataList.map((column)=> {
      const count = column.articleCount;
      const name=column.columnName;
      return {
        id: column.id,
        columnName: name,
        articleCnt: count ? <Link to={`/article/preview/${column.id}/1`}>{count}</Link> : count,
        operation: (
          <span>
            <a href="#" data-type="edit" data-name={name} data-id={column.id}
               onClick={this.handleEdit.bind(this)}>编辑</a>
            <a href="#" data-id={column.id} onClick={this.handleDelete.bind(this)}>删除</a>
          </span>
        )
      }
    });
    var modal=this.state.modal;
    console.log('modal',modal)
    return (
      <Card title={<span>分类管理</span>}>
        <div className="total">
              <span className="xe">
                <Button prefixCls="add-btn" data-type="add"
                        onClick={this.handleEdit.bind(this)}><img src={iconAdd}/> 新增
                </Button>
              </span>
        </div>
        <Table dataSource={dataSource} columns={columns} loading={this.state.loading}/>
        <Pagination page={this.state.page} onClick={this.handleQueryColumn.bind(this)}/>
        <Modal title={modal.title} visible={modal.visible} onClose={this.closeModal.bind(this)}
               onOk={this.handleEditConfirm.bind(this)}
        >分类名称：<Input focus value={modal.inputValue} onChange={this.handleInputChange.bind(this)} /></Modal>
      </Card>
    )
  }
}
export default ColumnPreview;
