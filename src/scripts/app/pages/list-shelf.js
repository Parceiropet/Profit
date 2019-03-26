(function($, window, document, undefined) {

  'use strict';

  var pages = PFTX.pages,
    giftlistShelf = new PFTX.constructor.page('giftlist-shelf');

  giftlistShelf.buildTopHtml = function() {

    var giftlistName = $('.giftlistinfo-description').eq(0).text(),
        giftlistDescription = $('.giftlistinfo-type-description').eq(0).text(),
        giftlistLink = $('.giftlistinfo-link').find('input').val();

    var html = '<div class="giftlist-top u-center">' +
                  '<div class="giftlist-top__title"><h3 class="giftlist-top__title-name">' + giftlistName + '</h3></div>' +
                    '<div class="giftlist-top__description">' +
                      '<div class="giftlist-top__description-main">' +
                        '<strong class="giftlist-top__description-title">DESCRIÇÃO</strong>' +
                        '<p class="giftlist-top__description-text">' + giftlistDescription + '</p>' +
                      '</div>' +
                      '<div class="giftlist-top__description-bottom">' +
                        '<a href="' + giftlistLink + '" class="giftlist-top__link">' + giftlistLink + '</a>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>';

    $('.list-shelf__info-wrapper').append(html);
  };

  giftlistShelf.DOMReady = function() {
    giftlistShelf.buildTopHtml();

    // $(".menu-departamento input[type='checkbox']").vtexSmartResearch({
    //     filtersMenu: '.menu-departamento',
    //     loadContent: ".prateleira-assinatura[id^=ResultItems]",
    //     removeCounter: true,
    //     emptySearchMsg: '<h3>Esta combinação de filtros não retornou nenhum resultado!</h3>',
    //     elemLoading: '',
    //     returnTopText: '',
    //     callback: function(){$('.helperComplement').remove();}
    // });
  };

  giftlistShelf.ajaxStop = function() {
    if($('.fakeSelect').length === 0)
    var customSelect = new PFTX.modules.customSelect({
      target: '.orderBy select'
    }).init();

  };


  pages.giftlistShelf = giftlistShelf;

})(jQuery, window, document);
