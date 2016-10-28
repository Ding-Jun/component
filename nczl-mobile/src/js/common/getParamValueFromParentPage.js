/**
 * Created by admin on 2016/10/28.
 */
/**
 * 获取父页面传值
 */
function getParamValueFromParentPage(paramName) {
  var result = '';
  var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);

  if (r != null) {
    //        result = unescape( r[ 2 ] );
    result = decodeURI(r[2]);
  }

  if (result == 'undefined') {
    result = null;
  }

  return result;
}
export default getParamValueFromParentPage;
