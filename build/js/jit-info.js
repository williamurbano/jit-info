/*! jit-info 2014-05-16 */
<<<<<<< HEAD
var menu    = document.getElementById("menu"),
    anchors = menu.getElementsByTagName("a"),
    actived = false;

for(var i in anchors) {
  if(anchors[i].href == window.location.href) {
    anchors[i].className += "active";
    actived = true;
  }
}

if(!actived) {
  anchors[0].className += "active";
}
=======
>>>>>>> gh-pages
