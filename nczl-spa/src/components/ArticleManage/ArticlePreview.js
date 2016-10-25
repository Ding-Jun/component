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

import '../common/util/date'
const iconAdd = require('../../images/icon_add.gif');
class ArticlePreview extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      page: {
        rowData: []
      },
      loading: true,
      query:{
        columnId:"",
        title:""
      },
      searchValue:'2'
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
  handleSearchValueChange(e){
    e.preventDefault();
    var value=e.target.value;
    this.setState({searchValue:value});
    //value= value.replace()
  }
  queryArticleList(targetPage,query) {
    query=query||this.state.query;
    var queryString='';
    for(var arg in query){
      if(query[arg]){queryString+=`&${arg}=${query[arg]}`}
    }
    var url=`/nczl-web/rs/article/list?curPage=${targetPage}&pageSize=5`+queryString;
    $.ajax({
      type: 'GET',
      url: url,
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
  handleSearch(e){
    e.preventDefault();
    var query=this.state.query;
    query.title=this.state.searchValue;
    this.queryArticleList(1,query);
    this.setState({query:query});
  }
  handleColumnClick(e){
    e.preventDefault();
    const columnId=  e.target.getAttribute("data-column-id");
    var query=this.state.query;
    query.columnId=columnId;
    this.setState({query:query,loading: true});
    this.queryArticleList(1,query);
  }

  render() {
    const columns = [{title: '标题', dataIndex: 'title', width: "39%", key: 'title'},
      {title: '所属分类', dataIndex: 'columnName', width: "8%", key: 'columnName', isOptd: true},
      {title: '浏览量', dataIndex: 'pageviews', width: "7%", key: 'pageviews'},
      {title: '点赞数', dataIndex: 'likes', width: "6%", key: 'likes'},
      {title: '评论数', dataIndex: 'comments', width: "8%", key: 'comments', isOptd: true},
      {title: '发布时间', dataIndex: 'createTime', width: "8%", key: 'createTime'},
      {title: '排序', dataIndex: 'sort', width: "5%", key: 'sort'},
      {title: '置顶？', dataIndex: 'isStick', width: "4%", key: 'isStick'},
      {title: '状态', dataIndex: 'status', width: "6%", key: 'status'},
      {title: '操作', dataIndex: 'operation', width: "9%", key: 'operation', isOptd: true}];
    var dataList = this.state.page.rowData || [];
    var dataSource = dataList.map((article)=> {
      var status;
      switch (article.status){
        case 0:status='已停止';break;
        case 1:status='已发布';break;
        default:status='unknown';
      }
      return {
        id: article.id,
        title: article.title,
        columnName: <a href="#" data-column-id={article.columnId} onClick={this.handleColumnClick.bind(this)}>{article.columnName}</a>,
        pageviews: article.pageviews,
        likes: article.likes,
        createTime: new Date(article.createtime).Format("yyyy-MM-dd"),
        sort: article.sort,
        isStick: article.stick==1?'是':null,
        status: status,
        comments: article.comments,
        operation: (
          <span>
            <Link to={`/article/detail/readOnly/${article.id}`}>详细</Link>
            <Link to={`/article/detail/edit/${article.id}`}>编辑</Link>
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
          <input className="input1" type="text" value={this.state.searchValue} onChange={this.handleSearchValueChange.bind(this)} /> <Button onClick={this.handleSearch.bind(this)}>搜索</Button>
        </div>
        <Table dataSource={dataSource} columns={columns} loading={this.state.loading}/>
        <Pagination  page={this.state.page} onClick={this.handleQueryArticle.bind(this)}/>
      </Card>
    )
  }
}
export default ArticlePreview;
