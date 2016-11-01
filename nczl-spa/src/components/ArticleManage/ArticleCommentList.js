/**
 * Created by admin on 2016/11/1.
 */
import React from 'react'
import Card from '../common/Card'
import Table from '../common/Table'
import Pagination from '../common/Pagination'
import '../common/util/date'
class ArticleCommentList extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      title: '',
      page: {
        curPage: this.props.params.targetPage || 1,
        rowData: []
      },
      loading: true
    }
  }

  componentWillMount() {
    this.queryCommentList(this.state.page.curPage);
  }

  queryCommentList(targetPage) {
    var url = `/nczl-web/rs/comment/list`;
    $.ajax({
      type: 'GET',
      url: url,
      data: {
        objectId: this.props.params.articleId,
        curPage: targetPage,
        pageSize: 20,
        status: 1
      },
      dataType: 'json',
      success: function (rm) {
        if (rm.code == 1) {
          console.log('debug', rm.result);
          this.setState({
            page: rm.result,
            loading: false,
            title: rm.params.objectTitle
          })
        }
      }.bind(this)
    })
  }

  handleQueryCommentList(event) {
    event.preventDefault();
    var targetPage = event.currentTarget.getAttribute("data-page");
    console.log("targetPage", targetPage)
    this.setState({
      loading: true
    })
    this.queryCommentList(targetPage);
  }

  render() {
    const columns = [{title: '评论内容', dataIndex: 'content', width: "39%", key: 'content'},
      {title: '评论微信号', dataIndex: 'wxnickname', width: "8%", key: 'wxnickname'},
      {title: '发表时间', dataIndex: 'createtime', width: "7%", key: 'createtime'}]
    var dataList = this.state.page.rowData || [];
    var dataSource = dataList.map((comment)=> {
      return {
        id: comment.id,
        content: comment.content,
        wxnickname: comment.wxnickname,
        createtime: new Date(comment.createtime).Format("yyyy-MM-dd hh:mm:ss")
      }
    })
    return (

      <Card title={<span>{this.state.title} 评论信息</span>}>
        <Table dataSource={dataSource} columns={columns} loading={this.state.loading}/>
        <Pagination page={this.state.page} onClick={this.handleQueryCommentList.bind(this)}/>
      </Card>
    )
  }
}
export default ArticleCommentList;
