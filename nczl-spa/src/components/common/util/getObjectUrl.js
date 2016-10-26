/**
<<<<<<< HEAD
 * Created by a8518 on 2016/10/25.
 */
function getObjectURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) { // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

export default getObjectURL;
=======
 * Created by admin on 2016/10/26.
 */
function getFileUrl(file) {
  var url = null;
  if (window.createObjectURL != undefined) {
    url = window.createObjectURL(file)
  } else if (window.URL != undefined) {
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL != undefined) {
    url = window.webkitURL.createObjectURL(file)
  }
  return url

}

export default getFileUrl;
>>>>>>> 6e6052fa9c820f67df42a667491a388128e6083c
