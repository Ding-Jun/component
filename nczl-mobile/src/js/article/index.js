import $ from 'jquery'
import {showArticle} from './article'
import {addComment, showCommentList, addLikes,doShowCommentList} from './comment'
import getParamValueFromParentPage from '../common/getParamValueFromParentPage'
$(function () {
  //showArticleList(1,{columnId:5});
  var articleId = getParamValueFromParentPage('id');
  if (articleId) {
    showArticle(articleId, function onLoaded() {
      $('#like').bind("click", function () {
        addLikes(articleId, function () {
          console.log('$(.text()', $('#like').text());
          $('#like').text($('#like').text() - 0 + 1)
        })
      })
    });

    showCommentList(articleId, 1);

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
        $('.layer').hide()
      });
    });


  }

})


function eventBind() {

}
