(function( $, window, document, undefined ) {

'use strict';

PFTX.modules.floatingMenu = {};

// Atributos

// Elemento que recebe a classe
PFTX.modules.floatingMenu.$target = $( 'html' );
// Status do header flutuante

PFTX.modules.floatingMenu.floated = false;

// Altura em que o header flutuante aparece
PFTX.modules.floatingMenu.menuHeight = 175;

// Nome da classe inserida no HTML
PFTX.modules.floatingMenu.className = 'floating-menu';



// Metodos

// Atribuindo eventos
PFTX.modules.floatingMenu.bindEvents = function() {

    $( window ).scroll(function() {

        // Rolar a partir da altura do header
        if ( $( window ).scrollTop() > PFTX.modules.floatingMenu.menuHeight ) {

            // se o menu não estiver ativado, ativamos ele
            if ( !PFTX.modules.floatingMenu.floated ) {
                // false
                PFTX.modules.floatingMenu.$target.addClass( PFTX.modules.floatingMenu.className );
                PFTX.modules.floatingMenu.floated = true;
            }

        } else {

            // Se estiver ativo, desativamos ele
            if ( PFTX.modules.floatingMenu.floated ) { // true
                PFTX.modules.floatingMenu.$target.removeClass( PFTX.modules.floatingMenu.className );
                PFTX.modules.floatingMenu.floated = false;
            }
        }
    });
};

// Inicia o modulo
PFTX.modules.floatingMenu.init = function() {

    // Adicionando eventos ao modulo
    PFTX.modules.floatingMenu.bindEvents();
};
})( jQuery, window, document );