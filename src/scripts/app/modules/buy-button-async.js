(function($, window, document, undefined) {

    'use strict';

    // Atributos
    PFTX.modules.buyButtonAsync = {
        buyButton: null, // botao de compra
        modalContainer: null, // modal de opcao
        modal: {
            container: '', // container do modal
            mensagem: '', // mensagem do produto
            nome: '', // nome do produto
            descricao: '', // descricao do produto
            tamanho: '', // tamanho do produto
            cor: '', // cor do produto
            close: '', // close do produto
            foto: '' // foto do produto
        },
        callbackSuccess: function() {}, // callback sucesso
        callbackError: function() {} // callback erro
    };

    // Atribuindo eventos
    PFTX.modules.buyButtonAsync.bindEvents = function() {
        // btn de compra
        PFTX.modules.buyButtonAsync.buyButton.on('click', PFTX.modules.buyButtonAsync.hasSKUChecked);

        // fechar modal
        PFTX.modules.buyButtonAsync.modal.close.on('click', function(){
            PFTX.modules.buyButtonAsync.modal.container.fadeOut();
        });
        PFTX.modules.buyButtonAsync.modal.container.on('click', function(event){
            if (event.target === this) {
                PFTX.modules.buyButtonAsync.modal.container.fadeOut();
            }
        });
        $('.modalbtn-continuar').on('click', function(){
            PFTX.modules.buyButtonAsync.modal.container.fadeOut();
        });
    };

    // Verifica se existe um SKU escolhido e parte para a proxima etapa
    PFTX.modules.buyButtonAsync.hasSKUChecked = function(event) {


        // testo a existencia da palavra JAVASCRIPT
        // se ela existe o botao ainda nao esta pronto para ser enviado
        if (!(/javascript/g).test(PFTX.modules.buyButtonAsync.buyButton.attr('href'))) {

            // cancelando propagacao padrao
            event.preventDefault();

            // adiciona o produto no carrinho
            console.log('PFTX.modules.buyButtonAsync.addToCart');
            PFTX.modules.buyButtonAsync.addToCart();
        } else {
            console.log('else');
        }
    };

    // adiciona o produto no carrinho
    PFTX.modules.buyButtonAsync.addToCart = function() {
        console.log('PFTX.modules.buyButtonAsync.addToCart - doing');

        $.ajax({
            url: PFTX.modules.buyButtonAsync.buyButton.attr('href'),
            type: 'GET'
        }).done(function() {
            console.log('PFTX.modules.buyButtonAsync.addToCart - done');
            // Exibe um modal com link para carrinho e link para continuar comprando
            PFTX.modules.buyButtonAsync.showModal();
            $(document).trigger('cartProductAdded.vtex');
        });
    };


    /** Modal
     *
     * Add Modal
     * Show Modal
     * Close Modal
     *
     */

    // add um modal com link para carrinho e link para continuar comprando
    PFTX.modules.buyButtonAsync.addModal = function() {

        //
        var modal = '';
        modal += '<div class="modalbtn-overlay">';
        modal += '<div class="modalbtn">';
        modal += '<div class="modalbtn-close"></div>';
        modal += '<div class="modalbtn-image-wrapper">';
        modal += '<img alt="" class="modalbtn-image" />';
        modal += '</div>';
        modal += '<div class="modalbtn-content">';
        modal += '<div class="modalbtn-mensagem">Produto adicionado à sacola</div>';
        modal += '<div class="modalbtn-nome"></div>';
        modal += '<div class="modalbtn-description"></div>';
        modal += '<div class="modalbtn-tamanho"></div>';
        modal += '<div class="modalbtn-cor"></div>';
        modal += '<a class="modalbtn-continuar">Continuar comprando</a>';
        modal += '<a href="/checkout" class="modalbtn-finalizar">Finalizar compra</a>';
        modal += '</div><!-- modalbtn-content -->';
        modal += '</div><!-- modalbtn -->';
        modal += '</div><!-- modalbtn-overlay -->';

        //
        $('body').append(modal);

        // Modal elements
        PFTX.modules.buyButtonAsync.modal = {
            container: $('.modalbtn-overlay'),
            mensagem: $('.modalbtn-mensagem'),
            nome: $('.modalbtn-nome'),
            descricao: $('.modalbtn-description'),
            tamanho: $('.modalbtn-tamanho'),
            cor: $('.modalbtn-cor'),
            foto: $('.modalbtn-image'),
            close: $('.modalbtn-close')
        };
    };

    // Exibe um modal com link para carrinho e link para continuar comprando
    PFTX.modules.buyButtonAsync.showModal = function() {

        PFTX.modules.buyButtonAsync.modal.nome.html($('.fn.productName').text());
        PFTX.modules.buyButtonAsync.modal.descricao.html($('.product-description-short').text());
        PFTX.modules.buyButtonAsync.modal.tamanho.html($('.item-dimension-Tamanho').find('input:checked').attr('data-value'));
        PFTX.modules.buyButtonAsync.modal.cor.html($('.item-dimension-Cor').find('input:checked').attr('data-value'));
        PFTX.modules.buyButtonAsync.modal.foto.attr('src', $('#image').find('img').eq(0).attr('src'));

        // exibe os elementos
        PFTX.modules.buyButtonAsync.modal.container.fadeIn();
    };

    // Inicia o modulo
    PFTX.modules.buyButtonAsync.init = function(options) {

        // iterando um objeto
        for (var prop in options) {
            if (PFTX.modules.buyButtonAsync.hasOwnProperty(prop)) {
                PFTX.modules.buyButtonAsync[prop] = options[prop];
            }
        }

        // Adicionando eventos ao modulo
        if (PFTX.modules.buyButtonAsync.buyButton) {

            // add um modal com link para carrinho e link para continuar comprando
            PFTX.modules.buyButtonAsync.addModal();

            // atribui eventos
            PFTX.modules.buyButtonAsync.bindEvents();
        }
    };

    // Modulo de botao de comprar async
    // PFTX.modules.buyButtonAsync.init({
    //     buyButton: $('.product-button-buy').find('.buy-button') // botao de compra
    //     // modalContainer: null, // modal de opcao
    //     // callbackSucess: function() {}, // callback sucesso
    //     // callbackError: function() {} // callback erro
    // });


})(jQuery, window, document);
