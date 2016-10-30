/**
 * Created by admin on 2016/10/27.
 */
//===============Show Articles=======================
import $ from 'jquery'
import {map,isArray} from 'lodash'
import urlEncode from '../common/urlEncode'
import {root} from '../common/constants'
import '../common/date'
export const showArticleList = (targetPage, query) => {
  var queryString = urlEncode(query);
  var url = `${root}/rs/article/list?curPage=${targetPage}&pageSize=100${queryString}`;
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function (rm) {
      if (rm.code == 1) {
        doShowArticleList(rm.result.rowData);
      }
    }
  })

}

export const doShowArticleList = (articles)=> {
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
  //console.log("articleList",articleList);
  $('.article-loading').before(articleList.join(''));
}


export const showArticle = (id,onLoaded) => {
  if(!isNaN(id)){
    $.ajax({
      type: 'GET',
      url: `/nczl-web/rs/article/detail?id=${id}`,
      dataType: 'json',
      success: function (rm) {
        if (rm.code == 1) {
          doShowArticle(rm.result);
          onLoaded();
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



export const showTopArticle = () => {
  var url = `${root}/rs/article/top`;
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function (rm) {
      if (rm.code == 1) {
        doShowArticleList(rm.result.rowData);
      }
    }
  })

}

export const doshowTopArticle = (articles)=> {
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
  //console.log("articleList",articleList);
  $('.article-loading').before(articleList.join(''));
}
