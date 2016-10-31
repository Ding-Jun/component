/**
 * Created by admin on 2016/10/28.
 */
import {map,isFunction} from 'lodash'
import {root} from '../common/constants'
import urlEncode from '../common/urlEncode'
/**
 * ajax显示评论列表
 * @param targetPage
 * @param query
 */
const noop=()=>{};
export const showCommentList= (id,targetPage, query,callback) => {
  if(!isNaN(id)){
    $.ajax({
      type: 'GET',
      url: `/nczl-web/rs/comment/list?curPage=${targetPage}&pageSize=10&objectId=${id}`,
      dataType: 'json',
      success: function (rm) {
        console.log('showCommentList rm',rm);
        if (rm.code == 1) {
          doShowCommentList(rm.result.rowData);
          $('#commentCount').text(`(${rm.result.totalRows})`)
          isFunction(callback)? callback(rm.result):noop();
        }
      }
    })
  }else{
    //alert("不是数字");
  }

}
/**
 * 显示评论列表
 * @param comments
 */
export const doShowCommentList = (comments)=> {

  var commentList = map(comments, (comment)=>(
    `<li>${comment.content}<div class="cltop"><span>${(new Date(comment.createtime)).Format("yyyy-MM-dd hh:mm:ss")}</span></div></li>`
  ))
  console.log('doshowCommentList comments',comments,commentList);
  $('#thelist').append(commentList.join(''));
}


export const addComment =(objectId,content,onSuccess)=>{
  $.ajax({
    type: 'POST',
    url: `/nczl-web/rs/comment/add`,
    data:{
      objectId:objectId,
      content:content
    },
    dataType: 'json',
    success: function (rm) {
      console.log('rm',rm);
      if (rm.code == 1) {
        onSuccess();
      }
    }
  })
}
/**
 * 点赞
 * @param id
 */
export const addLikes=(id,onSuccess) =>{
  $.ajax({
    url: root + "/rs/article/like",
    type: "POST",
    data:{
      id:id
    },
    dataType: 'json',
    success: function(rm) {
      if (rm.code==1 ) {
        onSuccess();
       // $("#star").html(rm.data);
      } else {
        alert("您已经点过赞了哦～");
      }
    }
  });
}
