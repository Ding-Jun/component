import $ from 'jquery'
import {showArticle} from './article'
import {addComment, showCommentList, addLikes,doShowCommentList} from './comment'
import getParamValueFromParentPage from '../common/getParamValueFromParentPage'
$(function () {
  //iscroll
  loaded();
   articleId = getParamValueFromParentPage('id');
  if (articleId) {
    showArticle(articleId, function onLoaded() {
      $('#like').bind("click", function () {
        addLikes(articleId, function () {
          console.log('$(.text()', $('#like').text());
          $('#like').text($('#like').text() - 0 + 1)
        })
      })
      pullDown.innerHTML = '';
      setTimeout(function () { myScroll.refresh(); }, 0);
    });

    showCommentList(articleId, curPage,{},()=>{
      pullDown.innerHTML = '';
      setTimeout(function () { myScroll.refresh(); }, 0);
    });

    $(".btn_pay").bind("click", function () {
      const content=$('#comment-input').val();
      addComment(articleId,content , ()=> {
        $('#comment-input').val('');
        var comment={
          content:`${content}<br>(审核通过后其他人可见)`,
          createtime:Number(new Date())
        }
        console.log("comment",comment)
        doShowCommentList([comment]);
        setTimeout(function () { myScroll.refresh(); }, 0);
        $('.layer').hide()
        myScroll.scrollToElement(document.querySelector('#scroller li:last-child'), null, null, true)
      });
    });


  }

})



var articleId;
//IScroll
var myScroll;
var pullDownFlag, pullUpFlag;
var pullDown, pullUp;
var spinner;
var curPage = 1;
function positionJudge() {
  if (this.y > 40) {    //判断下拉
    /*pullDown.innerHTML = "放开刷新页面";
    console.log('放开刷新页面');*/
    pullDownFlag = 1;
  } else if (this.y < (this.maxScrollY - 40)) {   //判断上拉
    pullUp.innerHTML = "放开刷新页面";
    console.log('放开刷新页面');
    pullUpFlag = 1;
  }
}
function action() {
  if (pullDownFlag == 1) {
    /*pullDownAction();
    pullDown.innerHTML = "下拉刷新…";
    console.log('下拉刷新');*/
    pullDownFlag = 0;
  } else if (pullUpFlag == 1) {
    pullUpAction();
    pullUp.innerHTML = `<img src="../../images/loading.gif"/>`;
    console.log('上拉刷新');
    pullUpFlag = 0;
  }
}
function loaded() {
  pullDownFlag = 0;
  pullUpFlag = 0;
  pullDown = document.getElementById("pullDown");
  pullUp = document.getElementById("pullUp");
  myScroll = new IScroll("#wrapper", {
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
    tap: true,//允许tap事件
    preventDefault: false,
    preventDefaultException: {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/},  //放行A标签
//        snap: "li",//以 li 为单位
  });
  myScroll.on('scroll', positionJudge);
  myScroll.on("scrollEnd", action);
}
function pullDownAction() {
  curPage = 1;
  refreshArticleList(curPage, {title:keyword}, ()=> {
    pullDown.innerHTML = '';
    setTimeout(function () {
      myScroll.refresh();
    }, 0);
  });
}
function pullUpAction() {
  curPage++;
  showCommentList(articleId, curPage,{},(page)=>{
    pullDown.innerHTML = '';
    if (curPage > page.totalPage) {
      curPage = page.totalPage;
      pullUp.innerHTML = '已经是最后一页';
    }
    setTimeout(function () { myScroll.refresh(); }, 0);
  });
}
function updatePosition() {
  pullDown.innerHTML = this.y >> 0;
}
document.addEventListener('touchmove', function (e) {
  e.preventDefault();
}, false);
