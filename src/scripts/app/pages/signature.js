(function($, window, document, undefined) {

    'use strict';

    var pages = PFTX.pages,
        signature = new PFTX.constructor.page('signature');

    signature.filters = function() {
        var id = '';

        $('.signature__filters__button').click(function(e) {
            $('.signature__filters__button').removeClass('signature-active');
            $(this).addClass('signature-active');
            id = $(this).attr('id');
            // console.log(id);
            $('.signature__shelf').hide();
            $('.signature__shelf').each(function() {
                console.log($(this));
                if ($(this).hasClass(id)) {
                    $(this).fadeIn();
                }
            });
        })
    }

    signature.events = function() {
        $('div.signature__filtres-block').on('click', function(event) {
            event.preventDefault();
            $('.signature__filtres-block > ul').slideToggle();
        });
    }

    signature.DOMReady = function() {
        signature.filters();

        if (($('html').width()) < 768) {
            signature.events();
        }
    };

    signature.ajaxStop = function() {

    };

    pages.signature = signature;

})(jQuery, window, document);
