(function($, window, document, undefined) {

    'use strict';

    PFTX.modules.autoComplete = {
        qtd: 4, //quantidade maxima de resultados
        template: '29a178dc-78ee-4676-a99c-e299dd973a10', // template
        $searchBox: $('#q'), // campo de busca
        $form: $('.pftx-autocomplete'), // form de busca
        $target: $('.autocomplete-resultado'), // container plugin
        $resultados: $('.autocomplete-resultado'), // container dos resultados
        $maisBuscados: $('.autocomplete-mais-buscados'), // container do CMC mais buscados
        $bgAutocomplete: $('.bg-autocomplete'), // Background escuro Autocomplete
        debounceInterval: 250, // intervalo entre requisicoes ajax
        debounceTimeout: undefined, // status do debounce time
        debounce: true // ativa um intervalo entre requisicoes ajax economizando banda - True [default]
    };



    // Metodos

    // Atribuindo eventos
    PFTX.modules.autoComplete.bindEvents = function() {

        // monta autocomplete
        PFTX.modules.autoComplete.$searchBox.on('keyup', function() {

            var term = $(this).val();

            if (term.length >= 3) {
                if (PFTX.modules.autoComplete.debounce) {
                    // debounce ativado
                    PFTX.modules.autoComplete.deboundAutoComplete(term, PFTX.modules.autoComplete.qtd);
                } else {
                    // debounce desativado
                    PFTX.modules.autoComplete.searchTerm(term, PFTX.modules.autoComplete.qtd);

                }
            } else {
                // exibe os mais buscados
                PFTX.modules.autoComplete.toggleAutocomplete('mais-buscados');
            }
        });

        // foco no campo
        PFTX.modules.autoComplete.$searchBox.on('focus', function() {

            var term = $(this).val();

            if (term.length >= 3) {
                PFTX.modules.autoComplete.searchTerm(term, PFTX.modules.autoComplete.qtd);

            } else {
                // exibe os mais buscados
                PFTX.modules.autoComplete.toggleAutocomplete('mais-buscados');
            }
        });

        // desfoque no campo
        PFTX.modules.autoComplete.$bgAutocomplete.on('click', function() {

            // oculta os resultados
            setTimeout(function() {
                PFTX.modules.autoComplete.toggleAutocomplete('');
                PFTX.modules.autoComplete.$searchBox.val('');
            }, 300);
        });

        $('.autocomplete-btn-all-results').live('click',function(){
            PFTX.modules.autoComplete.$form.submit();
        });

        // desfoque no campo
        PFTX.modules.autoComplete.$form.on('submit', function(event) {
            event.preventDefault();

            var newLocation = window.location.origin + '/' + encodeURIComponent(PFTX.modules.autoComplete.$searchBox.val());
            window.location.href = newLocation;
        });
    };

    PFTX.modules.autoComplete.searchTerm = function(term, qtd) {

        var termEncode = encodeURIComponent(term);
        var urlBusca = "/buscapagina?sl=" + PFTX.modules.autoComplete.template + "&PS=" + qtd + "&cc=10&sm=0&PageNumber=1&ft=" + termEncode;

        $.ajax({
                url: urlBusca,
                beforeSend: function() {
                    // xhr.overrideMimeType("text/plain; charset=x-user-defined");
                    // console.log('ajax send');
                    // console.time('ajaxterm');
                }
            })
            .fail(function() {
                // exibe o mais buscados
                PFTX.modules.autoComplete.toggleAutocomplete('mais-buscados');
            })
            .done(function(data) {
                // console.timeEnd('ajaxterm');
                // exibe os resultados
                if (!!data.length) {
                    // se existir resultados
                    PFTX.modules.autoComplete.toggleAutocomplete('resultado');
                    PFTX.modules.autoComplete.$resultados.html(data);

                } else {
                    // se nao existir resultados, exibe o mais buscados
                    PFTX.modules.autoComplete.toggleAutocomplete('mais-buscados');
                    $('.autocomplete-btn-all-results').hide();
                }
            }).always(function(){
                // console.log("/buscapagina?sl=" + PFTX.modules.autoComplete.template + "&PS=" + qtd + "&cc=10&sm=0&PageNumber=1&ft=" + term);
                PFTX.modules.autoComplete.buildAutoComplete();
            });
    };


    PFTX.modules.autoComplete.deboundAutoComplete = function(term, qtd) {

        if (typeof PFTX.modules.autoComplete.debounceTimeout === "number") {
            // limpa intervalo
            clearTimeout(PFTX.modules.autoComplete.debounceTimeout);
        }

        // espero para ultima interacao
        PFTX.modules.autoComplete.debounceTimeout = setTimeout(function() {
            PFTX.modules.autoComplete.searchTerm(term, qtd);

        }, PFTX.modules.autoComplete.debounceInterval);
    };

    PFTX.modules.autoComplete.buildAutoComplete = function() {
        // ajustando posicao do autocomplete
        var leftDistance = PFTX.modules.autoComplete.$searchBox.offset().left - 1,
            topDistance = PFTX.modules.autoComplete.$searchBox.offset().top + PFTX.modules.autoComplete.$searchBox.height() - 4;

        PFTX.modules.autoComplete.$target.css({
            'left': leftDistance,
            'top': topDistance
        });

        var scroll = $(window).scrollTop();

        // reseta o css de posicionamento
        var resetPosition = function() {
            PFTX.modules.autoComplete.$target.css({
                'left': '',
                'top': '',
                'right': '',
                'margin': '',
                'position': ''
            });
        };

        // //verifica a posição inicial do scroll
        // if (scroll > 600) {
        //     resetPosition();
        //     PFTX.modules.autoComplete.$target.css({
        //         'position': 'fixed',
        //         'top': '70px',
        //         'left': '0',
        //         'right': '0',
        //         'margin': 'auto'
        //     });
        // } else {
        //     resetPosition();
        //     PFTX.modules.autoComplete.$target.css({
        //         'left': leftDistance,
        //         'top': topDistance
        //     });
        // }

        resetPosition();
        PFTX.modules.autoComplete.$target.css({
            'left': leftDistance,
            'top': topDistance
        });

        // reposiciona o autocomplete caso de scroll na pagina
        $(window).scroll(function(event) {
            // var scroll = $(window).scrollTop();
            // if (scroll > 600) {
            //     resetPosition();
            //     PFTX.modules.autoComplete.$target.css({
            //         'position': 'fixed',
            //         'top': '70px',
            //         'left': '0',
            //         'right': '0',
            //         'margin': 'auto'
            //     });
            // } else {
            //     resetPosition();
            //     PFTX.modules.autoComplete.$target.css({
            //         'left': leftDistance,
            //         'top': topDistance
            //     });
            // }

            resetPosition();
            PFTX.modules.autoComplete.$target.css({
                'left': leftDistance,
                'top': topDistance
            });
        });
    };


    // metodo que define quem ficara visivel
    PFTX.modules.autoComplete.toggleAutocomplete = function(target) {
        // ajustando posicao do autocomplete

        // update position

        switch (target) {

            case 'resultado':
                PFTX.modules.autoComplete.$target.show();
                PFTX.modules.autoComplete.$resultados.show();
                PFTX.modules.autoComplete.$maisBuscados.hide();
                PFTX.modules.autoComplete.$searchBox.addClass('active');
                PFTX.modules.autoComplete.$bgAutocomplete.show();

                break;

            case 'mais-buscados':
                PFTX.modules.autoComplete.$target.hide();
                PFTX.modules.autoComplete.$maisBuscados.hide();
                PFTX.modules.autoComplete.$resultados.hide();
                PFTX.modules.autoComplete.$searchBox.removeClass('active');
                PFTX.modules.autoComplete.$bgAutocomplete.hide();

                break;

            default:
                PFTX.modules.autoComplete.$target.hide();
                PFTX.modules.autoComplete.$maisBuscados.hide();
                PFTX.modules.autoComplete.$resultados.hide();
                PFTX.modules.autoComplete.$searchBox.removeClass('active');
                PFTX.modules.autoComplete.$bgAutocomplete.hide();

                break;
        }
    };

    // Inicia o modulo
    PFTX.modules.autoComplete.init = function() {

        // Adicionando eventos ao modulo
        PFTX.modules.autoComplete.bindEvents();

        // Adicionando eventos ao modulo
        PFTX.modules.autoComplete.buildAutoComplete();

        // Adicionando as sugestões
    };
})(jQuery, window.top, document);
