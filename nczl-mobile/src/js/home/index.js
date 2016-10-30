
import 'core-js/fn/object/assign';
import {map} from 'lodash'
import $ from 'jquery'
import urlEncode from '../common/urlEncode'
import {root} from '../common/constants'
import {showArticleList,doShowArticleList} from '../article/article'

$(function(){
  //showArticleList(1,{columnId:5});
  //showArticleList(1)
  doShowArticleList([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
  $('#searchForm').bind('submit',function (e) {
    e.preventDefault();
    window.location.href =`search.html?keyword=${encodeURIComponent($('#searchForm > .si').val())}`;
    console.log("youyyyy sumt",$('#searchForm > .si').val())
  })

  var myScroll= new IScroll('#wrapper',{
    mouseWheel: true,
    tap:true
  });

  doShowArticleList([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
  setTimeout(function () { myScroll.refresh(); }, 0);
})

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);




var myScroll,
  pullDownEl, pullDownOffset,
  pullUpEl, pullUpOffset,
  generatedCount = 0;

/**
 * 下拉刷新 （自定义实现此方法）
 * myScroll.refresh();      // 数据加载完成后，调用界面更新方法
 */
var myPullUpLabel = '上拉加载更多...';
var myPullUpRefrushLabel = '松手开始更新...';
var myPullDownLabel = '下拉刷新...';
var myPullDownRefushLabel = '松手开始更新...';
var myPullLoadLabel = '加载中...';
function pullDownAction () {
  appendNewReviewsList();

}

function pullUpAction () {
  appendNewReviewsList();

}

/**
 * 初始化iScroll控件
 */
function loaded() {
  pullDownEl = document.getElementById('pullDown');
  pullDownOffset = pullDownEl.offsetHeight;
  pullUpEl = document.getElementById('pullUp');
  pullUpOffset = pullUpEl.offsetHeight;

  myScroll = new iScroll('wrapper', {
    scrollbarClass: 'myScrollbar', /* 重要样式 */
    useTransition: false, /* 此属性不知用意，本人从true改为false */
    topOffset: pullDownOffset,
    onRefresh: function () {
      if (pullDownEl.className.match('loading')) {
        pullDownEl.className = '';
        pullDownEl.querySelector('.pullDownLabel').innerHTML = myPullDownLabel;
      } else if (pullUpEl.className.match('loading')) {
        pullUpEl.className = '';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = myPullUpLabel;
      }
    },
    onScrollMove: function () {
      if (this.y > 5 && !pullDownEl.className.match('flip')) {
        pullDownEl.className = 'flip';
        pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
        this.minScrollY = 0;
      } else if (this.y < 5 && pullDownEl.className.match('flip')) {
        pullDownEl.className = '';
        pullDownEl.querySelector('.pullDownLabel').innerHTML = myPullDownLabel;
        this.minScrollY = -pullDownOffset;
      } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
        pullUpEl.className = 'flip';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = myPullUpRefrushLabel;
        this.maxScrollY = this.maxScrollY;
      } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
        pullUpEl.className = '';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = myPullUpLabel;
        this.maxScrollY = pullUpOffset;
      }
    },
    onScrollEnd: function () {
      if (pullDownEl.className.match('flip')) {
        pullDownEl.className = 'loading';
        pullDownEl.querySelector('.pullDownLabel').innerHTML = myPullLoadLabel;
        pullDownAction();   // Execute custom function (ajax call?)
      } else if (pullUpEl.className.match('flip')) {
        pullUpEl.className = 'loading';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = myPullLoadLabel;
        pullUpAction(); // Execute custom function (ajax call?)
      }
    }
  });

  setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) { $(".commont")||e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false);

  $(function(){
  $( ".reviews" ).show();
  reloadReviewsList();
})
  var lastReviewId = null;
  function isAndroid(){
  return /Android/.test(navigator.userAgent);
}
  function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
  return callback(WebViewJavascriptBridge);
}
  if (window.WVJBCallbacks) {
  return window.WVJBCallbacks.push(callback);
}
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() {
  document.documentElement.removeChild(WVJBIframe)
}, 0)
}
  function showReviews(){
  var jsonData;
  if(isAndroid()){
  jsonData = window.o2Android.getGoodsInfo();
  if(typeof jsonData == "string"){
  jsonData = eval('('+jsonData+')');
  $( "#userId" ).val( jsonData.user_id );
  $( "#productId" ).val( jsonData.product_id );
  $("#colCityCode").val( jsonData.city_code );
  console.info( 'colIdItem:' + jsonData.product_id );
  console.info('colCityCode:'+jsonData.city_code);

  $( ".reviews" ).show();
  reloadReviewsList();
}
}else{
  setupWebViewJavascriptBridge(function(bridge){});
  var bridge = window.WebViewJavascriptBridge;
  if (typeof (bridge.callHandler) == 'function'){
  bridge.callHandler('getGoodInfo', {'': ''}, function(response){
  jsonData = eval('('+response+')');
  $( "#userId" ).val( jsonData.user_id );
  $( "#productId" ).val( jsonData.product_id );
  $("#colCityCode").val( jsonData.city_code );
  console.info( 'colIdItem:' + jsonData.product_id );
  console.info('colCityCode:'+jsonData.city_code);

  $( ".reviews" ).show();
  reloadReviewsList();
})
}
}
}

  function appendReviewsList ( reviewList ) {
  var listElms = '';

  if ( reviewList == null || reviewList.length <= 0 ) {
  return '';
}

  $.each( reviewList, function ( i, item ) {
  var userName = ( item.user_name != null ? item.user_name : '' );
  var time = ( item.comment_date != null ? item.comment_date : '' );
  var stars = getStars( item.product_score );
  var cnt = ( item.comment_content != null ? item.comment_content : '' );

  listElms += '<li><div class="cltop"><span>' + userName + ' ' + time + '</span>' + stars + '</div>' + cnt + '</li>';

  lastReviewId = item.id;
} );
  $( "#oldestId" ).val( lastReviewId );
  $( "#thelist" ).append( listElms );
  myScroll.refresh();
}

  function getStars ( stars ) {
  var starElms = '';

  if ( stars != null ) {
  while ( stars-- > 0 ) {
  starElms += '<img src="http://120.27.163.126/templateSource/icon_star.png">';
}
}

  return starElms;
}

  var lastComments = 0;
  var pageNum = 0;
  function reloadReviewsList () {
  $( "#thelist" ).children().remove();
  $( "#oldestId" ).val( '' );
  $( ".pullUpLabel" ).html( '上拉加载更多...' );
  var formParams = $( "#prodInfoCommentsForm" ).serialize();
  pageNum = 0;
  $.ajax( {
  type : 'GET',
  url : 'http://114.55.43.64:8080/o2reviews/product/productinfocomments',
  data : formParams,
  dataType : 'jsonp',
  contentType : 'application/json'
} );
}
  function prodInfoComments ( data ) {
  pageNum += 1;
  if ( data.code == 1 ) {
  lastComments = data.result.length;
  appendReviewsList( data.result );
  if ( lastComments != 15 ) {
  if (pageNum != 1) {
  myPullLoadLabel = '评论已经加载完啦';
  myPullUpLabel = '评论已经加载完啦';
  myPullUpRefrushLabel = '评论已经加载完啦';
  $("#pull_up_icon").removeClass();
  $( ".pullUpLabel" ).html( '评论已经加载完啦' );
} else {
  myPullLoadLabel = '';
  myPullUpLabel = '';
  myPullUpRefrushLabel = '';
  $("#pull_up_icon").removeClass();
  $( ".pullUpLabel" ).html( '' );
}
}
} else {
  pullUpLabel = '加载失败,请重试';
}
}

  function appendNewReviewsList () {

  if ( lastComments == 15 ) {
  var formParams = $( "#prodInfoCommentsForm" ).serialize();
  $.ajax( {
  type : 'GET',
  url : 'http://114.55.43.64:8080/o2reviews/product/productinfocomments',
  data : formParams,
  dataType : 'jsonp',
  contentType : 'application/json'
} );
} else {
  if (pageNum != 1) {
  myPullLoadLabel = '评论已经加载完啦';
  myPullUpLabel = '评论已经加载完啦';
  myPullUpRefrushLabel = '评论已经加载完啦';
  $("#pull_up_icon").removeClass();
  $( ".pullUpLabel" ).html( '评论已经加载完啦' );
} else {
  myPullLoadLabel = '';
  myPullUpLabel = '';
  myPullUpRefrushLabel = '';
  $("#pull_up_icon").removeClass();
  $( ".pullUpLabel" ).html( '' );
}
}
}
