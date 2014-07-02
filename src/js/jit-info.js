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

  var modalServicoDetalhe;

  $.ajax({
    url: 'data.json',
    method: "GET"
  }).done(function(data) {
    modalServicoDetalhe = data.servicos;
  });

  $('.servicos > .row > .item').click(function() {
    var $elModalServicoDetalhe = $('#modal_servico_detalhe');
    var $modalTitle            = $elModalServicoDetalhe.find('.modal-title');
    var $modalBody             = $elModalServicoDetalhe.find('.modal-body');
    var $icone                 = $(this).find('.icone > .fa').clone();
    var $ul                    = $('<ul></ul>');
    var $li;
    var $p                     = $('<p></p>');
    var id                     = $(this).data('id');
    var servicos               = modalServicoDetalhe[id];
    var i                      = 0;

    $modalTitle.text(servicos.titulo);

    for(i = 0; i < servicos.itens.length; i++) {
      console.log(servicos.itens[i]);
      $li = $('<li></li>');
      $li.text(servicos.itens[i]);
      $ul.append($li);

      console.log($li);
    }

    $p.append($ul);

    $modalBody.empty().append($p);


    // console.log(modalServicoDetalhe[id]);
    // console.log($icone);

    $elModalServicoDetalhe.modal('show');

  });
})(jQuery);