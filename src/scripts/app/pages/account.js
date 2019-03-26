(function( $, window, document, undefined ) {

  'use strict';

  PFTX.pages.account = new PFTX.constructor.page( 'account' );

  PFTX.pages.account.DOMReady = function() {
      // Remove o Bootstrap
      // $('link').each(function(){
      //     var bootstrap = 'bootstrap';

      //     if($(this).attr('href').indexOf(bootstrap) >= 0)
      //     $(this).attr('href','');
      // });
      $('link[href*=bootstrap]').remove();
      $('body').show();

      // Fechar form

      function getUrlVars()
      {
          var vars = [], hash;
          var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
          for(var i = 0; i < hashes.length; i++)
          {
              hash = hashes[i].split('=');
              vars.push(hash[0]);
              vars[hash[0]] = hash[1];
          }
          return vars;
      }

      var orders = getUrlVars()["orders"];

      $('#form-address').on('click', '.btn-link', function(event){
          event.preventDefault();
          $('#address-edit').fadeOut();
      });

      $('#accountAjaxBusy').on('click', function(){
          $('.btn-link').click();
      });

      $('.tabs__controls--item').first().addClass('active');

      $('.tabs__controls--item').on('click', function(){
          var target = $(this).data('target');

          $('.tabs__controls--item').removeClass('active');
          $(this).addClass('active');

          $('.tabs__item').hide();
          $('.tabs__item.'+target).show();
      });

      $('.address-update').on('click', function(event){
          event.preventDefault();
          $('#address-edit').fadeIn();
      });
      $('.edit-address-link').on('click','.delete', function(event){
          event.preventDefault();
          $('#address-remove').fadeIn();
      });
      $('.exclude').on('click', '.btn-link', function(event){
          $('#address-remove').fadeOut();
      });

      if(orders == 'true'){
        $('.tabs__item.account').hide();
        $('.tabs__item.orders').show();
        $('.tabs__controls--item:eq(0)').removeClass('active');
        $('.tabs__controls--item:eq(1)').addClass('active');
      }
      
  };

  PFTX.pages.account.ajaxStop = function() {
      if($('.fakeSelect').length === 0)
          var customSelect = new PFTX.modules.customSelect({
              target: '.tabs select'
          }).init();
  };

  })( jQuery, window, document );
