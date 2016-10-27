
import 'core-js/fn/object/assign';
import urlEncode from './common/urlEncode'
import {root} from './common/constants'
$(function(){
  showArticleList(1,{columnId:5});
  console.log('String fiy',urlEncode({}));
})


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

function doshowArticleList(page) {

}
