(function($, window, document, undefined) {
    /*
    Modulo verifica se o cliente está logado
    e adiciona uma classe a tag <HTML>
*/

    'use strict';

    PFTX.modules.loginStatus = {};

    // Atributos

    // Elemento que recebe a classe
    PFTX.modules.loginStatus.$target = $('html');

    // // Nome da classe inserida no HTML quando o cliente estiver logado
    PFTX.modules.loginStatus.loggedClass = 'logado';

    // // Nome da classe inserida no HTML quando o cliente estiver deslogado
    PFTX.modules.loginStatus.unLoggedClass = 'deslogado';

    // Metodos

    PFTX.modules.loginStatus.toggleHtmlClass = function() {
        // faz a requisição do objeto no vtexjs
        vtexjs.checkout.getOrderForm().done(function(orderForm) {

            // faz a verificação no atributo loggedIn
            if (orderForm.loggedIn) {
                PFTX.modules.loginStatus.$target.addClass(PFTX.modules.loginStatus.loggedClass);
            } else {
                PFTX.modules.loginStatus.$target.addClass(PFTX.modules.loginStatus.unLoggedClass);
            }

        });
    };

    // Inicia o modulo
    PFTX.modules.loginStatus.init = function() {

        // Chamando metodo de troca de classe
        PFTX.modules.loginStatus.toggleHtmlClass();
    };
})(jQuery, window, document);
