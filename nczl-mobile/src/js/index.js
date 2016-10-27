
import 'core-js/fn/object/assign';
import {map} from 'lodash'
import urlEncode from './common/urlEncode'
import {root} from './common/constants'
$(function(){
  //showArticleList(1,{columnId:5});
  console.log('String fiy',urlEncode({}));
  doShowArticleList([1,2,23,3]);
  doShowArticleList([1,2,23,3]);
})

//===============Show Articles=======================
function showArticleList(targetPage,query) {

  var queryString=urlEncode(query);
  var url=`${root}/rs/article/list?curPage=${targetPage}&pageSize=10${queryString}`;
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function (rm) {
      if (rm.code == 1) {
        doshowArticleList(rm.result);
      }
    }
  })

}

function doShowArticleList(articles) {
  var articleList = map(articles,(article)=>(
    [
      `<a href="article.html">`,
      `<div class="news">`,
      `<img src="images/pic2.jpg" class="newspic">`,
        `<h2>超越传统互联 健康中国步入大数据时代</h2>`,
        `<h5><span><img src="images/icon_like.png" width="22"> 23433</span> 沈某某  在线护理宣教演示参与医院护士长</h5>`,
      `</div></a>`
    ].join('')
  ))
  console.log("articleList",articleList);
  $('.article-loading').before(articleList.join(''));
}

//===================Show Slider Picture================================
function showSliderPictureList() {

  var url=`${root}/rs/article/list?curPage=${targetPage}&pageSize=10`;
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function (rm) {
      if (rm.code == 1) {
        doShowSliderPictureList(rm.result);
      }
    }
  })

}

function doShowSliderPictureList(articles) {
  var articleList = map(articles,(article)=>(
    [
      `<a href="article.html">`,
      `<div class="news">`,
      `<img src="images/pic2.jpg" class="newspic">`,
      `<h2>超越传统互联 健康中国步入大数据时代</h2>`,
      `<h5><span><img src="images/icon_like.png" width="22"> 23433</span> 沈某某  在线护理宣教演示参与医院护士长</h5>`,
      `</div></a>`
    ].join('')
  ))
  console.log("articleList",articleList);
  $('.article-loading').before(articleList.join(''));
}
