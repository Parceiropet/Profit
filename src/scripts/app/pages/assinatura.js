(function($, window, document, undefined) {

    'use strict';

    var assinatura = new PFTX.constructor.page('signature');

    assinatura.DOMReady = function() {

      // ---------------------- Barra de categorias ------------------------- //
      var nodes = document.querySelectorAll('.search-single-navigator h3 a')

      for (var i = 0; i < nodes.length; i++) {

        var title = nodes[i].innerHTML
        var link = nodes[i].getAttribute('href')

        var tag = '<a href="'+link+'"><button>'+title+'</button></a>'

        document.querySelector('.top-filters__category').innerHTML += tag
      }
      // ---------------------- Barra de categorias ------------------------- //

      // -------------------------- Bread Crumb ----------------------------- //
      var breadCrumb = document.querySelector('.bread-crumb ul')

      breadCrumb.innerHTML += '<li><a href="/assinaturas">Assinaturas</a></li>'
      // -------------------------- Bread Crumb ----------------------------- //
    };

    assinatura.ajaxStop = function() {

    };


    PFTX.pages.assinatura = assinatura;

})(jQuery, window, document);
