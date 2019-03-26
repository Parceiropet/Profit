(function( $, window, document ) {

'use strict';

var PFTX = window.PFTX = window.PFTX || {},
    $body = $( 'body' );

PFTX.pages = {};
PFTX.modules = {};

PFTX.init = function() {

    // Funções executadas a todas as páginas
    PFTX.pages.common.init();

    // Executa as funcões correspondentes à página atual
    $.each( PFTX.pages, function() {
        if ( $body.hasClass( this.pageClass ) ) {
            if ( this.hasOwnProperty( 'init' ) ) {
                this.init();
            }
        }
    });
};

})( jQuery, window, document );