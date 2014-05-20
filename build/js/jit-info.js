/*! jit-info 2014-05-20 */
;(function(document) {
  var menu, navs, itens, anchor, href, i, j;

  href = window.location.href.split("/");
  menu = document.getElementById("menu");
  navs = menu.getElementsByClassName("navbar-nav");

  if(href[href.length-1].length > 0) {
    for (i in navs) {
      if (!isNaN(i)) {
        itens = navs[i].getElementsByTagName("li");

        for(j in itens) {
          if(!isNaN(j)) {
            anchor = itens[j].getElementsByTagName("a")[0];
            if(anchor.href == window.location.href) {
              itens[j].className += "active";
            }
          }
        }
      }
    }
  } else {
    for(i in navs) {
      if(!isNaN(i)) {
        itens = navs[i].getElementsByTagName("li");
        itens[0].className += "active";
      }
    }
  }
})(document);

;(function(document){
  var date = new Date();
  document.getElementById('year').innerHTML = date.getFullYear();
})(document);