
import 'core-js/fn/object/assign';
import {map} from 'lodash'
import urlEncode from '../common/urlEncode'
import {root} from '../common/constants'
import {showArticleList} from '../article/article'
$(function(){
  //showArticleList(1,{columnId:5});
  showArticleList(1)
  $('#searchForm').bind('submit',function (e) {
    e.preventDefault();
    window.location.href =`search.html?keyword=${encodeURIComponent($('#searchForm > .si').val())}`;
    console.log("youyyyy sumt",$('#searchForm > .si').val())
  })
  //var myScroll = new iScroll('#wrapper');
})






