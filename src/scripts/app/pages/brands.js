(function ($, window, document, undefined) {
  'use strict';

  PFTX.pages.brands = new PFTX.constructor.page('brands');

  // PFTX.pages.brands.parseXML = function(data) {
  //     var _data = data,
  //         shopsArr = $($.parseXML(data)).find('brand');
  //     return shopsArr;
  // };

  // PFTX.pages.brands.loadXML = function(url, callback) {
  //     var _callback = callback || function() {
  //
  //     };
  //
  //     if (typeof url != 'string') {
  //         throw 'The URL must be a String';
  //     }
  //     $.ajax({
  //         url: url,
  //         crossDomain: true,
  //         success: function(data) {
  //             _callback(data);
  //         }
  //     });
  // };

  PFTX.pages.brands.fixedNav = function () {
    $(window).scroll(function () {
      var scrollTop = $(window).scrollTop();
      var elementOffset = $('.brand__wrapper').offset().top;
      var currentElementOffset = (elementOffset - scrollTop);
      if (currentElementOffset < 180) {
        $('.filters__nav').addClass('float');
        $('.brand__list-block').addClass('float-block');
      } else {
        $('.filters__nav').removeClass('float');
        $('.brand__list-block').removeClass('float-block');
      }
    });
  }

  PFTX.pages.brands.BindEnvets = function () {
    if ($(window).width() < 768) {
      $('.brand__list').each(function (index) {
        if ($(this).find('li').length > 7) {
          $(this).append('<span class="ver-mais">Ver mais +</span>');
        };
      });
    } else {
      $('.ver-mais').remove();
    };

    $('.filters__nav-options').on('click', function () {
      $('.filters__nav-options').removeClass('active')
      $(this).addClass('active');
      $('.brand__list').each(function () {
        if($(this).is(':empty')) {
          $(this).parent('.brand').hide();
        }
      });
    });

    $('.filters__nav-options').on('click', function (e) {
      // e.preventDefault();
      var item = $(this).data('letter');
      $('.brand__list-block').each(function () {
        if ($(this).hasClass(item)) {
          $('.brand__list-block').removeClass('active');
          $(this).addClass('active');
        };
      });
      $('html, body').animate({
        scrollTop: 0
      }, '300');
    });
  };

  // Botão ver mais marcas
  PFTX.pages.brands.seeMoreMarcas = function () {
    $('.ver-mais').on('click', function () {
      if ($(this).parent().hasClass('see-more')) {
        $('.ver-mais').text('Ver mais +');
        $(this).parent().removeClass('see-more');
      } else {
        $('.ver-mais').text('Ver menos -');
        $(this).parent().addClass('see-more');
      }
    });
  }

  PFTX.pages.brands.loadBrands = function () {
    $.ajax({
      url: "https://cs-profite-com-br.umbler.net/vtex-curl/get.php",
      dataType: 'jsonp',
      jsonp: "callback",
      crossDomain: true,
      data: {
        url: 'http://parceiropet.vtexcommercestable.com.br/api/catalog_system/pvt/brand/list',
        accept: 'application/json'
      },
      success: function (data) {
        console.log('data', data);
        var data = data[0];
        var brands = [];

        for (var i = 0; i < data.length; i++) {
          if (data[i].isActive) {
            brands.push(data[i]);
          }
        }


        var $top = $('.brand__wrapper'),
          list = [],
          name, url, index;

        $('.brand__item').remove();

        console.log(brands);

        $.each(brands, function (i, brand) {
          name = brand.name,
            url = '/' + name,
            index = name.charAt(0).toUpperCase();

          if (!index.match(/[a-z]/i)) {
            index = '123';
          }
          console.log('index', index);

          $('.brand--' + index + ' .brand__list').append('<li class="brand__item" data-letter="' + name.trim().charAt(0) + '"><a href="' + url + '" class="brand__item--link">' + name + '</a></li>');
        });

        // Marcando letras vazias
        $('.brand__list:empty').each(function () {
          var letter = $(this).siblings('h4').text();
          $('.filters__item.option--' + letter).addClass('empty');
        });

        // Controles das letras
        $('.filters__item.option--A').addClass('active');
        $('.filters__item:not(.empty)').on('click', function (e) {
          e.preventDefault();

          $('.filters__item.active').removeClass('active');
          $(this).addClass('active');

          var destino = '.brand--' + $(this).text();
          var y = jQuery(destino).offset().top - 100
          jQuery('html, body').animate({
            scrollTop: y
          }, 500);
        });

        PFTX.pages.brands.BindEnvets();

        // Botão ver mais em descrição
        PFTX.pages.brands.seeMoreMarcas();
      }
    });
  }


  PFTX.pages.brands.DOMReady = function () {

    // Fixa o nav de letras
    PFTX.pages.brands.fixedNav();

    PFTX.pages.brands.BindEnvets();

    if ($(window).width() < 768) {
      $('.filters__nav-list').slick({
        slide: '.filters__nav-options',
        arrows: false,
        dots: false,
        slidesToShow: 4,
        infinite: false
      });
    } else {
      $('.filters__nav-list').slick('unslick');
    }

    window.addEventListener('resize', function (event) {
      if ($(window).width() > 768) {
        if (!$('.filters__nav-list').hasClass('slick-initialized')) {
          $('.filters__nav-list').slick({
            slide: '.filters__nav-options',
            arrows: false,
            dots: false,
            slidesToShow: 4,
            infinite: false
          });
        }
      } else {
        if ($('.filters__nav-list').hasClass('slick-initialized')) {
          $('.filters__nav-list').slick('unslick');
        }
      }
    });


    //   Ajuste no bread-crumb
    $('.bread-crumb ul').append('<li class="last">Marcas</li>');

    PFTX.pages.brands.loadBrands();

    $('.brand__list').each(function () {
      if($(this).is(':empty')) {
        $(this).parent('.brand').hide();
      }
    });

  };

  PFTX.pages.brands.ajaxStop = function () {
    // Verifica se existe algum hash e direciona para a listagem correspondente
    var hash = window.location.hash || false;

    if (hash) {
        // hash = hash.replace('#', '');

        var destino = hash;
        var y = jQuery(destino).offset().top - 100
        jQuery('html, body').animate({
            scrollTop: y
        }, 500);
    }
  }

})(jQuery, window, document);
