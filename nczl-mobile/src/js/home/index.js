import 'core-js/fn/object/assign';
import {map} from 'lodash'
import $ from 'jquery'
import urlEncode from '../common/urlEncode'
import {root} from '../common/constants'
import {showArticleList, showTopArticleList,refreshArticleList} from '../article/article'

$(function(){
  $('#searchForm').bind('submit',function (e) {
    e.preventDefault();
    window.location.href =`search.html?keyword=${encodeURIComponent($('#searchForm > .si').val())}`;
    console.log("youyyyy sumt",$('#searchForm > .si').val())
  })

  showTopArticleList();
  loaded()
  refreshArticleList(curPage, {}, ()=> {
    pullDown.innerHTML = '';
    setTimeout(function () { myScroll.refresh(); }, 0);
  });

  //myScroll.refresh();
});



var myScroll;
var pullDownFlag,pullUpFlag;
var pullDown,pullUp;
var spinner;
var curPage=1;
function positionJudge(){
  if(this.y>40){    //判断下拉
    pullDown.innerHTML = "放开刷新页面";
    console.log('放开刷新页面');
    pullDownFlag = 1;
  }else if(this.y<(this.maxScrollY-40)){   //判断上拉
    pullUp.innerHTML = "放开刷新页面";
    console.log('放开刷新页面');
    pullUpFlag = 1;
  }
}
function action(){
  if(pullDownFlag==1){
    pullDownAction();
    pullDown.innerHTML = `<img src="../../images/loading.gif"/>`;
    console.log('下拉刷新');
    pullDownFlag = 0;
  }else if(pullUpFlag==1){
    pullUpAction();
    pullUp.innerHTML = `<img src="../../images/loading.gif"/>`;
    console.log('上拉刷新');
    pullUpFlag = 0;
  }
}
function loaded(){
  pullDownFlag = 0;
  pullUpFlag = 0;
  pullDown = document.getElementById("pullDown");
  pullUp = document.getElementById("pullUp");
  myScroll = new IScroll("#wrapper",{
    probeType: 3,
//        momentum: false,//关闭惯性滑动
    mouseWheel: true,//鼠标滑轮开启
    //scrollbars: true,//滚动条可见
    fadeScrollbars: true,//滚动条渐隐
    interactiveScrollbars: true,//滚动条可拖动
    shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩
    useTransform: true,//CSS转化
    useTransition: true,//CSS过渡
    bounce: true,//反弹
    freeScroll: false,//只能在一个方向上滑动
    startX: 0,
    startY: 0,
    tap:true,//允许tap事件
    preventDefault: false,
    preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/ },  //放行A标签
//        snap: "li",//以 li 为单位
  });
  myScroll.on('scroll',positionJudge);
  myScroll.on("scrollEnd",action);
}
function pullDownAction(){
  curPage=1;
  var queryTopReady=false;
  var queryArticleReady=false;
  showTopArticleList(()=>{
    queryTopReady=true;
    if(queryTopReady && queryArticleReady){
      pullDown.innerHTML = '';
    }
    setTimeout(function () { myScroll.refresh(); }, 0);
  });
  refreshArticleList(curPage, {}, ()=> {
    queryArticleReady=true;
    if(queryTopReady && queryArticleReady){
      pullDown.innerHTML = '';
    }
    setTimeout(function () { myScroll.refresh(); }, 0);
  });
}
function pullUpAction(){
  curPage++;
  showArticleList(curPage, {}, (page)=> {
    pullUp.innerHTML = '';
    if(curPage>page.totalPage){
      curPage=page.totalPage;
      pullUp.innerHTML = '已经是最后一页';
    }
    setTimeout(function () { myScroll.refresh(); }, 0);
  });
}
function updatePosition(){
  pullDown.innerHTML = this.y>>0;
}
document.addEventListener('touchmove', function (e) {
  e.preventDefault();
}, false);
