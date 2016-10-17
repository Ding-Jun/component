//兼容IE8 add es5-polyfill  size:33K
import 'es5-shim';
import 'es5-shim/es5-sham';
import 'console-polyfill';
import 'core-js/fn/object/assign';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import { createStore, combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import App from './components/Main';
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




var userReducer = function (state = {}, action) {
  console.log('userReducer was called with state', state, 'and action', action)

  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    default:
      return state;
  }
}
var itemsReducer = function (state = [], action) {
  console.log('itemsReducer was called with state', state, 'and action', action)

  switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        action.item
      ]
    default:
      return state;
  }
}

var reducer = combineReducers({
  speaker: function (state = {}, action) {
    console.log('speaker was called with state', state, 'and action', action)

    switch (action.type) {
      case 'SAY':
        return {
          ...state,
          message: action.message
        }
      default:
        return state;
    }
  }
})
const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

var store_0 = createStore(reducer,applyMiddleware(...middleware));
var sayActionCreator = function (message) {
  return {
    type: 'SAY',
    message
  }
}
var asyncSayActionCreator_1 = function (message) {
  return function (dispatch) {
    setTimeout(function () {
      console.log(new Date(), 'Dispatch action now:')
      dispatch({
        type: 'SAY',
        message
      })
    }, 2000)
  }
}
console.log("\n", 'Running our normal action creator:', "\n")
console.log(new Date());
store_0.dispatch(asyncSayActionCreator_1("haha"))

console.log(new Date(),process.env);
console.log('store_0 state after action SAY:', store_0.getState())
store_0.dispatch({
  type: 'SET_NAME',
  name: 'bobo'
})
console.log('store_0 state after initialization:', store_0.getState())
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
  , document.getElementById('app'));
