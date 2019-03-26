(function( $, window, document, undefined ) {

'use strict';

PFTX.modules.navAllDepartments = {};

// Atributos
PFTX.modules.navAllDepartments.$target = '';

// Metodos

// Atribui eventos ao modulo
PFTX.modules.navAllDepartments.bindEvents = function() {
    PFTX.modules.navAllDepartments.$target.live( 'click', PFTX.modules.navAllDepartments.toggle );
};

// Verifica se está ativo, se estiver fecha o elemento, se não, abre o elemento
PFTX.modules.navAllDepartments.toggle = function() {
    if ( PFTX.modules.navAllDepartments.$target.hasClass( 'active' ) ) {
        PFTX.modules.navAllDepartments.$target.removeClass( 'active' );
    } else {
        PFTX.modules.navAllDepartments.$target.addClass( 'active' );
    }
    ;
};

// Inicia o modulo
PFTX.modules.navAllDepartments.init = function( target ) {
    PFTX.modules.navAllDepartments.$target = target;

    // Adicionando evnetos ao modulo
    PFTX.modules.navAllDepartments.bindEvents();
};

})( jQuery, window, document );