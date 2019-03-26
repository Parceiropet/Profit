(function($, window, document, undefined) {

    'use strict';

    var pages = PFTX.pages,
        orders = new PFTX.constructor.page('orders');

    orders.DOMReady = function() {

    };

    orders.ajaxStop = function() {

    };

    pages.orders = orders;

})(jQuery, window, document);
