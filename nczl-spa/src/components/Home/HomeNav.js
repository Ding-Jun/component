/**
 * Created by admin on 2016/10/13.
 */
import React from 'react'
import {Link} from 'react-router'
import Nav, {NavItem} from '../common/Nav'

let lt22 = require('../../images/lt22.png');
class HomeNav extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
  }

  render() {
    return (
      <div className="home-nav">
        <Nav>
          <NavItem ><Link to="/article/preview"><img src={lt22}/> 文章管理</Link></NavItem>
          <NavItem ><Link to="/column/preview/page/1"><img src={lt22}/> 分类管理</Link></NavItem>
          <NavItem className="hide"><Link to="/buyList/preview"><img src={lt22}/> 订阅信息</Link></NavItem>
          <NavItem className="hide"><Link to="articlereview/preview"><img src={lt22}/> 文章审核</Link></NavItem>
          <NavItem ><Link to="comment/preview"><img src={lt22}/> 评论审核</Link></NavItem>
          <NavItem className="hide"><Link to="redPacket/preview"><img src={lt22}/> 红包管理</Link></NavItem>
          <NavItem className="hide"><Link to="user/preview"><img src={lt22}/> 用户管理</Link></NavItem>
          <NavItem className="hide"><Link to="message/preview"><img src={lt22}/> 短信推送</Link></NavItem>
          <NavItem className="hide"><Link to="admin/preview"><img src={lt22}/> 管理员管理</Link></NavItem>
        </Nav>
      </div>
    )
  }
}
export default HomeNav;
