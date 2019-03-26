(function($, window, document, undefined) {

    'use strict';

    var pages = PFTX.pages,
        search = new PFTX.constructor.page('busca');

    /**
     * [Monta o resultado da pesquisa]
     * @return {[type]} [Resultado]
     */
    search.constructResultSearch = function() {

        // Verifica quantidade de resultados encontrados
        var resultSeach = $('.resultado-busca-numero .value').eq(1).html()

        // Insere o texto conforme o quantidade e o termo buscado;
        if(vtxctx.searchTerm !== '') {
            if (resultSeach == 0) {
                $('.title-search').find('h2').empty().text('Não foram encontrados resultados para presquisa');
                $('.title-search').css('opacity','1');
            }
            else {
                $('.title-search').find('h2').empty().html('<h2 class="titutlo-sessao">Sua busca por <span>“' + vtxctx.searchTerm + '”</span> encontrou ' + resultSeach + ' resultados</h2>');
                $('.title-search').css('opacity','1');
            }
        }
        else {
            $('.title-search').find('h2').empty().text(window.document.title);
            $('.title-search').css('opacity','1');
        }
    };

    search.DOMReady = function() {
        search.constructResultSearch();
    };

    search.ajaxStop = function() {
    };

    pages.search = search;

})(jQuery, window, document);
