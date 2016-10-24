//兼容IE8 add es5-polyfill  size:33K
import 'es5-shim';
import 'es5-shim/es5-sham';
import 'console-polyfill';
import 'core-js/fn/object/assign';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './stores';
import routes from './routes';

const store = configureStore(hashHistory);
console.log("initial state:",store.getState());
const history = syncHistoryWithStore(hashHistory, store);
/*
import {login,logout} from './actions'

store.dispatch(login("lisi"));
store.dispatch(logout("lisi"));
*/

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
)















/*
//import redux from 'redux'
//import { combineReducers ,createStore } from 'redux'
 //import {Router, Route, hashHistory, IndexRoute} from 'react-router'
//import HomeView from './components/HomeView'
import ColumnManage, {ColumnPreview, ColumnDetail} from './components/ColumnManage'
import ArticleManage, {ArticlePreview, ArticleDetail} from './components/ArticleManage'
import BuyListManage, {BuyListPreview, BuyListDetail} from './components/BuyListManage'
import ArticleReview, {ArticleReviewPreview, ArticleReviewDetail} from './components/ArticleReview'
import CommentReview, {CommentPreview} from './components/CommentReview'
import RedPacketManage, {RedPacketPreview, RedPacketDetail} from './components/RedPacketManage'
import UserManage, {UserPreview, UserDetail} from './components/UserManage'
import MessagePush, {MessagePreview, MessageDetail} from './components/MessagePush'
import AdminManage, {AdminPreview, AdminDetail} from './components/AdminManage'



// Render the main component into the dom
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/column" component={ColumnManage}>
        <Route path="/column/preview" component={ColumnPreview}/>
        <Route path="/column/detail" component={ColumnDetail}/>
      </Route>
      <Route path="/article" component={ArticleManage}>
        <Route path="/article/preview" component={ArticlePreview}/>
        <Route path="/article/detail" component={ArticleDetail}/>
      </Route>
      <Route path="/buyist" component={BuyListManage}>
        <Route path="/buyList/preview" component={BuyListPreview}/>
        <Route path="/buyList/detail" component={BuyListDetail}/>
      </Route>
      <Route path="/articleReview" component={ArticleReview}>
        <Route path="/articleReview/preview" component={ArticleReviewPreview}/>
        <Route path="/articleReview/detail" component={ArticleReviewDetail}/>
      </Route>
      <Route path="/comment" component={CommentReview}>
        <Route path="/comment/preview" component={CommentPreview}/>
      </Route>
      <Route path="/redPacket" component={RedPacketManage}>
        <Route path="/redPacket/preview" component={RedPacketPreview}/>
        <Route path="/redPacket/detail" component={RedPacketDetail}/>
      </Route>
      <Route path="/user" component={UserManage}>
        <Route path="/user/preview" component={UserPreview}/>
        <Route path="/user/detail" component={UserDetail}/>
      </Route>
      <Route path="/message" component={MessagePush}>
        <Route path="/message/preview" component={MessagePreview}/>
        <Route path="/message/detail" component={MessageDetail}/>
      </Route>
      <Route path="/admin" component={AdminManage}>
        <Route path="/admin/preview" component={AdminPreview}/>
        <Route path="/admin/detail" component={AdminDetail}/>
      </Route>
    </Route>

  </Router>
  , document.getElementById('app'));*/
