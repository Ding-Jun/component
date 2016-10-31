/**
 * Created by admin on 2016/10/27.
 */
//===============Show Articles=======================
import $ from 'jquery'
import {map,isArray,isFunction} from 'lodash'
import urlEncode from '../common/urlEncode'
import {root} from '../common/constants'
import '../common/date'

const noop=()=>{};
export const showArticleList = (targetPage, query,callback) => {
  var queryString = urlEncode(query);
  var url = `${root}/rs/article/list?curPage=${targetPage}&pageSize=10${queryString}`;
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function (rm) {
      if (rm.code == 1) {

        doShowArticleList(rm.result.rowData);
        isFunction(callback)? callback(rm.result):noop();
      }
    }
  })

  /*doShowArticleList([1,1]);
  console.log('append 2');
  callback()*/
}

export const refreshArticleList=(targetPage, query,callback)=>{
  var queryString = urlEncode(query);
  var url = `${root}/rs/article/list?curPage=${targetPage}&pageSize=10${queryString}`;
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function (rm) {
      if (rm.code == 1) {

        doRefreshArticleList(rm.result.rowData);
        isFunction(callback)? callback():noop();
      }
    }
  })

  //clear

  /*doRefreshArticleList([1,1]);
  console.log('refresh done');
  callback();*/
}
export const doRefreshArticleList= (articles)=> {
  $('#thelist').html(`<div class="article-loading"></div>`);
  var articleList=getArticleListStr(articles);
  $('.article-loading').before(articleList);
}

export const doShowArticleList = (articles)=> {
  var articleList=getArticleListStr(articles);
  $('.article-loading').before(articleList);
}
const getArticleListStr=(articles)=>{
  articles=articles||[];
  if(!isArray(articles)){articles=[articles]}
  var articleList = map(articles, (article)=>(
    [
      `<a href="article.html?id=${article.id}">`,
      `<div class="news">`,
      `<img src="${article.titleImg}" class="newspic">`,
      `<h2>${article.title}</h2>`,
      `<h5><span><img src='images/icon_like.png' width="22"> ${article.likes}</span> ${article.author}  </h5>`,
      `</div></a>`
    ].join('')
  ))
  return articleList.join('');
}

export const showArticle = (id,callback) => {
  if(!isNaN(id)){
    $.ajax({
      type: 'GET',
      url: `/nczl-web/rs/article/detail?id=${id}`,
      dataType: 'json',
      success: function (rm) {
        if (rm.code == 1) {
          doShowArticle(rm.result);
          isFunction(callback)? callback():noop();
        }
      }.bind(this)
    })
  }else{
    alert("不是数字");
  }

}

export const doShowArticle = (article)=> {
  var articleDetail = [
    `<div class="title">`,
    `<h2>${article.title}</h2>`,
    `<h5><span>${new Date(article.createtime).Format("yyyy-MM-dd")}</span>${article.author}  </h5>`,
    `</div>`,
    `<div class="articleinfo">`,
    `${article.contents}`,
    `<div class="like"><span id="like">${article.likes}</span></div>`,
    `</div>`
  ].join('');
  $('.article').append(articleDetail);
  console.log(articleDetail);
}



export const showTopArticleList = (callback) => {
  var url = `${root}/rs/article/top`;
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function (rm) {
      if (rm.code == 1) {
        doShowTopArticleList(rm.result);
        isFunction(callback)? callback():noop();
      }
    }
  })

}

export const doShowTopArticleList = (articles)=> {
  var articleList = getTopArticleStr(articles);

  console.log("doshowTopArticleList articleList",articleList);
  $('#slideBox > .hd').html('<ul></ul>');
  $('#slideBox > .bd').html(articleList);
  TouchSlide({
    slideCell: "#slideBox",
    titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
    mainCell: ".bd ul",
    effect: "leftLoop",
    autoPage: true,//自动分页
    autoPlay: true //自动播放
  });
}

const getTopArticleStr = (articles)=>{
  articles=articles||[];
  if(!isArray(articles)){articles=[articles]}
  var topArticleList=map(articles,(article)=>{
    return `<li><a class="pic" href="article.html?id=${article.id}"><img src="${article.stickImg}"/></a></li>`;
  })
  topArticleList=`<ul>${topArticleList.join('')}</ul>`
  return topArticleList;
}
