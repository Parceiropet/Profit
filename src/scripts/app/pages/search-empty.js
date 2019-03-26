(function($, window, document, undefined) {

    'use strict';

    var pages = PFTX.pages,
        emptySearch = new PFTX.constructor.page('busca-vazia');

    emptySearch.wordSearch = function() {
        var term = vtxctx.searchTerm;
        if(term === 'Sistema') {
            term = window.location.search.split('ft=')[1].split('&')[0];
            if(term !== undefined) {
                $('.title-search p > span').text(term);
            }
        }
    };

    emptySearch.DOMReady = function() {
        emptySearch.wordSearch();

        $('.prateleira-assinatura ul').slick({
            slide: '.prateleira-assinatura ul li',
            arrows: true,
            slidesToShow: 5,
            dots: false,
            infinite: true,
            responsive: [
                {
                breakpoint: 768,
                settings: {
                        arrows: true,
                        dots: true,
                        slidesToShow: 2
                    }
                }
            ]
        });
    };

    emptySearch.ajaxStop = function() {

    };

    pages.emptySearch = emptySearch;

})(jQuery, window, document);
