(function( $, window, document, undefined ) {

'use strict';

PFTX.modules.buyButton = {};

// Atributos
PFTX.modules.buyButton.floated = false;
PFTX.modules.buyButton.menuHeight = 110;

// Metodos

// Atribuindo eventos
PFTX.modules.buyButton.bindEvents = function() {
    $( '.more' ).live( 'click', function() {
        PFTX.modules.changeQuantity( 'more', $( this ) );
    });
    $( '.less' ).live( 'click', function() {
        PFTX.modules.changeQuantity( 'less', $( this ) );
    });
};

PFTX.modules.changeQuantity = function( modifier, $target ) {

    var $input = $target.parent().siblings( 'input' ),
        newValue = parseInt( $input.val() );

    if ( modifier === 'more' ) {
        newValue = newValue + 1;
        if ( newValue < 10 ) {
            newValue = '0' + newValue;
        }
        $input.val( newValue );
    } else {
        if ( newValue > 1 ) {
            newValue = newValue - 1;
            if ( newValue < 10 ) {
                newValue = '0' + newValue;
            }
            $input.val( newValue );
        }
    }
};

// Inicia o modulo
PFTX.modules.buyButton.init = function() {

    // Adicionando eventos ao modulo
    PFTX.modules.buyButton.bindEvents();
};

})( jQuery, window, document );