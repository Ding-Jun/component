/**
 * Created by admin on 2016/10/19.
 */
import App from './containers/App';
import ColumnManage, {ColumnPreview, ColumnDetail} from './components/ColumnManage'
import ArticleManage, {ArticlePreview, ArticleDetail} from './components/ArticleManage'
import BuyListManage, {BuyListPreview, BuyListDetail} from './components/BuyListManage'
import ArticleReview, {ArticleReviewPreview, ArticleReviewDetail} from './components/ArticleReview'
import CommentReview, {CommentPreview} from './components/CommentReview'
import RedPacketManage, {RedPacketPreview, RedPacketDetail} from './components/RedPacketManage'
import UserManage, {UserPreview, UserDetail} from './components/UserManage'
import MessagePush, {MessagePreview, MessageDetail} from './components/MessagePush'
import AdminManage, {AdminPreview, AdminDetail} from './components/AdminManage'
import PasswordEditorContainer from './containers/PasswordEditorContainer'
import ArticleDetailContainer from './containers/ArticleDetailContainer'

const routes = [
  {
    path: '/',
    component: App,
    childRoutes: [
      {
        path:'password',
        component:PasswordEditorContainer
      },
      {
        path: 'column',
        component: ColumnManage,
        childRoutes: [
          {path: '/column/preview/page/:targetPage', component: ColumnPreview},
          {path: '/column/detail', component: ColumnDetail}
        ]
      },
      {
        path: 'article',
        component: ArticleManage,
        childRoutes: [
          {path: '/article/preview/page/:targetPage', component: ArticlePreview},
          {path: '/article/detail/:type/:id', component: ArticleDetailContainer}
        ]
      },
      {
        path: 'buyList',
        component: BuyListManage,
        childRoutes: [
          {path: '/buyList/preview', component: BuyListPreview},
          {path: 'buyList/detail', component: BuyListDetail}
        ]
      },
      {
        path: 'articleReview',
        component: ArticleReview,
        childRoutes: [
          {path: '/articleReview/preview', component: ArticleReviewPreview},
          {path: '/articleReview/detail', component: ArticleReviewDetail}
        ]
      },
      {
        path: 'comment',
        component: CommentReview,
        childRoutes: [
          {path: '/comment/preview', component: CommentPreview}
        ]
      }, {
        path: 'redPacket',
        component: RedPacketManage,
        childRoutes: [
          {path: '/redPacket/preview', component: RedPacketPreview},
          {path: '/redPacket/detail', component: RedPacketDetail}
        ]
      },
      {
        path: 'user',
        component: UserManage,
        childRoutes: [
          {path: '/user/preview', component: UserPreview},
          {path: '/user/detail', component: UserDetail}
        ]
      },
      {
        path: 'message',
        component: MessagePush,
        childRoutes: [
          {path: '/message/preview', component: MessagePreview},
          {path: '/message/detail', component: MessageDetail}
        ]
      },
      {
        path: 'admin',
        component: AdminManage,
        childRoutes: [
          {path: '/admin/preview', component: AdminPreview},
          {path: '/admin/detail', component: AdminDetail}
        ]
      }
    ]
  }
];

export default routes;
