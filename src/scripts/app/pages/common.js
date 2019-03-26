(function ($, window, document, undefined) {

  'use strict';

  var pages = PFTX.pages,
    common = new PFTX.constructor.page('common');

  /**
   * [Eventos do header]
   */
  common.bindEventsHeader = function () {

    $('.icon-search').click(function () {
      $(this).parents().find('.page-header__middle--search').addClass('active-search');
      $('.fulltext-search-box').eq(0).focus();
      $('.icon-arrow-left').addClass('active-search');
    });

    $('.icon-arrow-left').click(function () {
      $('.page-header__middle--search').removeClass('active-search');
      $('.icon-arrow-left').removeClass('active-search');
    });

    if ($(window).width() < 768) {
      $('.icon-menu').click(function (event) {
        event.preventDefault();
        $('.page-wrapper, .l-wrapper, html').toggleClass('nav-active');
      });

      $('.wellcome-message').click(function () {
        $('.page-wrapper, .l-wrapper, html').toggleClass('nav-active');
      });
    };
  }

  /**
   * [Ativa o a visualização dos subitens no navigation do header]
   */
  common.toggleItens = function () {

    if ($(window).width() < 768) {
      // $("item-departament a.link").on('click', function (e) {
      //   e.preventDefault();
      //   $(this).parent().find($('.page-header__navigation--sub-departament')).slideToggle();
      //   return false;
      // });
      $('.menu-departamento h3').on('click', function(e){
        if(e.target.tagName === 'H3'){
          console.log('clicou no h3');
          e.preventDefault();
          $(this).toggleClass('open').find('ul').slideToggle();
          return false;
        }else if(e.target.tagName === 'A'){
          console.log('clicou no a');
          return true;
        }
      });
      // $(".menu-departamento h3 a.menu-item-texto").on('click', function (e) {
      //   e.preventDefault();
      //   $(this).parent().toggleClass('open').find('ul').slideToggle();
      //   return false;
      // });
      $('.page-header__navigation--departament .link').on('click', function(e){
          e.preventDefault();

          $(this).parent().toggleClass('open').find('.page-header__navigation--sub-departament').slideToggle()
      })
    }
  }


  common.controlNewsletter = function () {

    $('.page-footer__newsletter__wrapper').append("<h4 class='page-footer__newsletter__title--success'>Cadastro feito com sucesso.<br/> Agora é só aguardar as novidades!</h4>");
    $('.page-footer__newsletter__wrapper').append('<button class="reset-form">Cadastrar outro e-mail</button>');
    $('.page-footer__newsletter__form').append('<span class="page-footer__newsletter__feedback--error">Campo preenchido incorretamente</span>');

    $('.page-footer__newsletter__button-ok').on('click', function (e) {
      e.preventDefault();

      if($('.page-footer__newsletter-client-email').val() == ""){
        alert("Erro! Digite seu e-mail corretamente.");
      }

      var data = {
        newsletterClientName: "",
        newsletterClientEmail: $('.page-footer__newsletter-client-email').val(),
        newsInternalPage: '_',
        newsInternalPart: 'newsletter',
        newsInternalCampaign: 'newsletter:opt-in'
      };

      if (data.newsletterClientEmail.length && data.newsletterClientEmail !== "") {
        $.post('/no-cache/Newsletter.aspx', data).then(function (resp) {
          if (resp === "true") {
            $('.page-footer__newsletter__wrapper').addClass('success');
          } else if ($('.error').length) {
            $('.page-footer__newsletter__wrapper').addClass('error');

            $('.page-footer__newsletter__wrapper.error .page-footer__newsletter-client-email').on('focus', function () {
              $('.page-footer__newsletter__wrapper').removeClass('error');
            });
          } else {
            console.log("error");
            $('.page-footer__newsletter__wrapper').addClass('error');
          }
        });
      }
    });

    $('.reset-form').on('click', function (e) {
      e.preventDefault();

      $('.page-footer__newsletter__wrapper').removeClass('success');
      $('.page-footer__newsletter-client-email').val("");
    });
  }

  common.headerFloat = function () {
    window.onscroll = function () {
      if (window.pageYOffset) {
        $('html').addClass('header-float');
      } else {
        $('html').removeClass('header-float');
      }
    }
  }

  common.visitName = function () {
    try {
      if (typeof vtexjs.checkout.orderForm !== 'undefined') {
        var name = vtexjs.checkout.orderForm.clientProfileData.firstName;

        console.log(name);

        if (!name) {
          name = "Visitante";
        }

        $('.wellcome-message .name').text(name);

        console.log('new2', name);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }

  common.menuNavigation = function (cat) {
    // $('.page-header__navigation--content li').eq(0).remove();

    $.each(cat, function (index) {
      console.log(this.name);
      if (this.name === "Outros") {
        cat.push(this);
        cat.splice(index, 1);
      }
    });

    var itensMenu = cat.map(function (item) {
      var $name = item.name;
      var $url = item.url.replace(/.*\/\/[^\/]*/, '');

      // console.log($name, $url);

      if (item.children.length) {

        var childrenElm = item.children.map(function (elm) {

          var chrName = elm.name;
          var chrUrl = elm.url.replace(/.*\/\/[^\/]*/, '');

          return [
            '<li class="page-header__navigation--subitem"> <a class="page-header__navigation--sublink" href="' + chrUrl + '">' + chrName + '</a> </li>'
          ].join("");

        });

        return [
          '<li class="page-header__navigation--item">',
            '<a class="page-header__navigation--link" href="' + $url + '">' + $name + '</a>',
            '<div class="page-header__navigation--sub-departament">',
              '<ul class="page-header__navigation--sub-departament-itens">',
                childrenElm.join(""),
              '</ul>',
            '</div>',
          '</li>'
        ];

        // console.log('childrenElm', childrenElm);

      } else {

        return [
          '<li>',
            '<a href="' + $url + '">' + $name + '</a>',
          '</li>'
        ];
      }
    });

    console.log(itensMenu);

    var myNewItens = [].concat.apply([], itensMenu);



    $('li:not(.item-departament) > .page-header__navigation--departament').html('');
    $('li:not(.item-departament) > .page-header__navigation--departament').html(myNewItens.join(""));

    if($(window).width() < 768){
      $('.page-header__navigation--content li').eq(0).remove();
      $('.page-header__navigation--content').prepend(myNewItens.join(""));
    }else{
      $('li:not(.item-departament) > .page-header__navigation--departament').html('');
      $('li:not(.item-departament) > .page-header__navigation--departament').html(myNewItens.join(""));
    }
  };

  common.menuControle = function(){
    $('.menu-departamento ul').each(function(index, el) {
      var prev = $(this).prev();
      $(this).appendTo(prev);
    });
  }
  common.DOMReady = function () {
    common.menuControle();
    setTimeout(function(){
      if(window.location.pathname == "/_secure/account/orders/" || window.location.pathname == "/_secure/account/orders"){
        $('.tabs__controls--item').eq(1).trigger('click');
      }
    }, 200)

    if($(window).width() < 768){
      $('.accordion__title').click(function(){
        $(this).toggleClass('open').next(".accordion__content").slideToggle('fast');
      });
    }else{
      $('.accordion__title a').click(function(){
        $(this).next(".accordion__content").slideToggle('fast');
      });
    }

    $('.helperComplement').remove();

    var menu = sessionStorage.getItem("pftx-menu") || false;

    // if(menu){
    //   console.log('menu', menu);
    //   menu = JSON.parse(menu);

    //     if(typeof menu !== 'undefined') {
    //       var sorted = menu[0];

    //       sorted.sort(function (a, b) {
    //         var nameA = a.name.toLowerCase(),
    //           nameB = b.name.toLowerCase()
    //         if (nameA < nameB) //sort string ascending
    //           return -1
    //         if (nameA > nameB)
    //           return 1
    //         return 0 //default return value (no sorting)
    //       });

    //       common.menuNavigation(sorted);
    //     }

    // }
    // else{
    // $.ajax({
    //   url: "https://cs-profite-com-br.umbler.net/vtex-curl/get.php",
    //   dataType: 'jsonp',
    //   jsonp: "callback",
    //   data: {
    //     url: 'https://www.parceiropet.com/api/catalog_system/pvt/category/tree/3',
    //     accept: 'application/vnd.vtex.ds.v10+json'
    //   },
    //   success: function (obj) {
    //     sessionStorage.setItem('pftx-menu', JSON.stringify(obj));
    //     if(typeof obj !== 'undefined') {
    //       var sorted = obj[0];

    //       sorted.sort(function (a, b) {
    //         var nameA = a.name.toLowerCase(),
    //           nameB = b.name.toLowerCase()
    //         if (nameA < nameB) //sort string ascending
    //           return -1
    //         if (nameA > nameB)
    //           return 1
    //         return 0 //default return value (no sorting)
    //       });

    //       common.menuNavigation(sorted);
    //     }
    //   }
    // });
    // }



    PFTX.modules.minicart.init();

    common.toggleItens();

    common.bindEventsHeader();

    common.controlNewsletter();

    if ($(window).width() > 768) {
      common.headerFloat();
    }
  };

  common.ajaxStop = function () {
    common.visitName();

    /*if(window.innerWidth < 768) {
      $('.page-header__navigation--content').on('click', '.page-header__navigation--departament  a', function (evt) {
        evt.preventDefault();

        $(this).next('.page-header__navigation--sub-departament').slideToggle();
      });
    }*/

    PFTX.modules.minicart.removeItem();

    $('.header__cart-minicart--image img').each(function () {
      $(this).attr('src', $(this).attr('src').replace('55-55', '77-77'));
    });

    PFTX.modules.minicart.activeMiniCart();
  };

  pages.common = common;

})(jQuery, window, document);
