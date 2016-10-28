/**
 * Created by admin on 2016/10/28.
 */
import {map} from 'lodash'
import {root} from '../common/constants'

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
