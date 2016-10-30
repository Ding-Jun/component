/**
 * Created by admin on 2016/10/28.
 */
 import $ from 'jquery'
import {showArticleList} from '../article/article'
import getParamValueFromParentPage from '../common/getParamValueFromParentPage'
$(function () {
  //showArticleList(1,{columnId:5});
  var keyword = getParamValueFromParentPage('keyword');
 $('#keyword').text(keyword);
  showArticleList(1,{title:keyword});

})
