/*! jit-info 2014-05-22 */
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

;(function($){
  $('.formulario-de-contato').submit(function(e) {
    e.preventDefault();

    var resp, $form = $(this);

    $.ajax({
      url: 'enviar-contato.php',
      type: 'post',
      dataType: 'json',
      data: $form.serialize(),
      context: $form,
      beforeSend: function() {
        $('#email-status').fadeOut(function() {
          $(this).attr('class', 'text-muted').text("Enviando mensagem").fadeIn();
        });
      }
    }).done(function(data) {
      resp = data;
    }).always(function() {
      setTimeout(function() {
        $('#email-status').fadeOut(function() {
          $(this).attr('class', resp.class).text(resp.msg);
          $(this).fadeIn(function() {
            var $this = $(this);
            setTimeout(function() {
              $form.find('input, textarea').val('')
              $this.fadeOut();
            }, 2000);
          });
        });
      }, 2000);
    });
  });
})(jQuery);