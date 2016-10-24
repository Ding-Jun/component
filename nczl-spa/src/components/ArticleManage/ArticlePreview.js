/**
 * Created by admin on 2016/10/13.
 */
import React from 'react'
import {Link} from 'react-router'
import Card from '../common/Card'
import Table from '../common/Table'
import Button from '../common/Button'
import Pagination from '../common/Pagination'
import $ from 'jquery'

const iconAdd = require('../../images/icon_add.gif');
class ArticlePreview extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      page: {
        rowData: []
      },
      loading: true
    }
  }

  componentWillMount() {
    this.queryArticleList(1);
  }

  handleQueryArticle(event) {
    event.preventDefault();
    var targetPage = event.currentTarget.getAttribute("data-page");
    this.setState({
      loading: true
    })
    this.queryArticleList(targetPage);
  }

  queryArticleList(targetPage, nameFilter = {}) {

    $.ajax({
      type: 'GET',
      url: '/nczl-web/rs/admin/list?curPage=' + targetPage + '&pageSize=' + 5,
      dataType: 'json',
      success: function (rm) {
        if (rm.code == 1) {
          console.log('debug', rm.result);
          this.setState({
            page: rm.result,
            loading: false
          })
        }
      }.bind(this)
    })

  }

  render() {
    const columns = [{title: '标题', dataIndex: 'title', width: "39%", key: 'title'},
      {title: '所属分类', dataIndex: 'column', width: "8%", key: 'column', isOptd: true},
      {title: '浏览量', dataIndex: 'viewCnt', width: "7%", key: 'viewCnt'},
      {title: '点赞数', dataIndex: 'likeCnt', width: "6%", key: 'likeCnt'},
      {title: '评论数', dataIndex: 'commentCnt', width: "8%", key: 'commentCnt', isOptd: true},
      {title: '发布时间', dataIndex: 'time', width: "8%", key: 'time'},
      {title: '排序', dataIndex: 'sort', width: "5%", key: 'sort'},
      {title: '置顶？', dataIndex: 'isStick', width: "4%", key: 'isStick'},
      {title: '状态', dataIndex: 'status', width: "6%", key: 'status'},
      {title: '操作', dataIndex: 'operation', width: "9%", key: 'operation', isOptd: true}];
    var dataList = this.state.page.rowData || [];
    var dataSource = dataList.map((admin)=> {
      return {
        id: admin.id,
        username: admin.username,
        status: admin.status == 0 ? "启用" : "停用",
        operation: (
          <span>
            <a href="#">详细</a>
            <a href="#">编辑</a>
            <a href="#">删除</a>
          </span>
        )
      }
    });
    return (
      <Card title={<span>文章管理</span>}>
        <div className="total">
          <span className="xe"><Link to="/article/detail/edit/new"><Button prefixCls="add-btn" ><img
            src={iconAdd}/> 新增</Button></Link></span>请输入关键字搜索：
          <input className="input1" type="text"/> <Button>搜索</Button>
        </div>
        <Table dataSource={dataSource} columns={columns} loading={this.state.loading}/>
        <Pagination page={this.state.page} onClick={this.handleQueryArticle.bind(this)}/>
      </Card>
    )
  }
}
export default ArticlePreview;
