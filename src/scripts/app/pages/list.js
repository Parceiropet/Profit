(function($, window, document, undefined) {

    'use strict';

    var pages = PFTX.pages,
        giftlist = new PFTX.constructor.page('giftlist');


    // Funções da página de /product
    giftlist.controlEditProduct = function() {
        // Altera o local e visual do botão de visualizar
        $('.giftlistinfo-description').insertBefore('.list-action');
        $('.giftlist-edit-products .action-view a').text('Visualizar').show();
    }

    // Funções da página de /manage
    giftlist.controlManage = function() {
        // Change quantity info in manage block
        var _desiredItem = $('.giftlist-manage .giftlist-body-desired');
        var _purchasedItem = $('.giftlist-manage .giftlist-body-purchased');
        // let desired;
        // let purchased;

        if ((_desiredItem.length) && (_purchasedItem.length)) {
            var desired = _desiredItem.text();
            var purchased = _purchasedItem.text();

            _desiredItem.html('');
            _purchasedItem.text('Desejados/comprados: ' + desired + '/' + purchased);
            _purchasedItem.addClass('loaded');
        }
    };

    giftlist.DOMReady = function() {

        giftlist.controlManage()
        giftlist.controlEditProduct()

    };

    giftlist.ajaxStop = function() {

    };

    pages.giftlist = giftlist;

})(jQuery, window, document);
