/*

    Modulo: Produtos similares
    Description: Responsavel por carregar um produto similar nas prateleiras.

    @autor: Gabriel Sepulveda - @gbrlsepulveda
    @autor: Roberto Porlan - @robertoporlan

*/

(function( $, window, document, undefined ) {

'use strict';

PFTX.modules.similarProducts = {

    /*
        Atributos
    */
    fieldId: '344', // Id do campo de especificacao cadastrado pelo cliente
    fieldClass: 'product_field_', // Classe da especificacao inserida no html pela Vtex - Essa classe recebe o ID da especificacao

    // Classes de marcacao
    similarClassChecked: 'similar-checked', // classe para produto checado
    similarClassActive: 'similar-active', // classe para produto ativo
    similarClassUnavaliable: 'similar-inactive' //classe para produto indisponivel
};


/*
    Metodos
*/


// Checar produtos com similar
/*
    Recebe 2 parametros
    1 - os produtos das prateleiras, as LI's
    2 - funcao que monta a prateleira
*/
PFTX.modules.similarProducts.searchAvaliableProducts = function( $elements, checkifAvaliable ) {

    // For inverso, varrendo os produtos da prateleira
    for ( var i = $elements.length - 1; i >= 0; i-- ) {

        // Adicionando classe de checado
        $elements.eq( i ).addClass( PFTX.modules.similarProducts.similarClassChecked );

        if ( $elements.eq( i ).find( '.' + PFTX.modules.similarProducts.fieldClass + PFTX.modules.similarProducts.fieldId ).length > 0 ) {

            // Monto a prateleira de similar
            checkifAvaliable( $elements.eq( i ), PFTX.modules.similarProducts.makeSimilarShelf );
        } else {
            // Produto nao tem similar
            $elements.eq( i ).addClass( PFTX.modules.similarProducts.similarClassUnavaliable )
                .remove( '.' + PFTX.modules.similarProducts.fieldClass + PFTX.modules.similarProducts.fieldId );
        }
    }
    ;
};


/*
    Verifica a prateleira de similar
    Antes verifico um json que esta cadastrado na especificacao como string,
    tento fazer um parse do JSON para certificar que é valido, se nao for, removo o json e coloco a classe de similar indisponivel
*/
PFTX.modules.similarProducts.checkifAvaliable = function( $target, makeSimilarShelf ) {

    // Capturo o JSON para certificar que e valido, caso sim, monto o conteudo
    var similarJSON = $target.find( '.product-especification-code li' ).html();

    try {
        // Deu tudo certo, vou enviar o json e os itens para montar o conteudo
        var mySimilar = JSON.parse( similarJSON );
        makeSimilarShelf( $target, mySimilar );

    } catch (e) {

        // Removo o JSON do codigo, e adiciono a classe de indisponivel
        $target.addClass( PFTX.modules.similarProducts.similarClassUnavaliable )
            .remove( '.' + PFTX.modules.similarProducts.fieldClass + PFTX.modules.similarProducts.fieldId );
    };
};



/*
    Recebo o JSON montado, e o ITEM da prateleira que vai receber os similares
*/
PFTX.modules.similarProducts.makeSimilarShelf = function( $target, data ) {
    console.table( data );

    var linkSimilarSKU = '',
        fotoSimilarSKU = '',
        nomeSimilarSKU = '',
        thumbSimilarSKU = '';


    for ( var i = data.length - 1; i >= 0; i-- ) {
        if ( data[ i ].link && data[ i ].foto && data[ i ].nome && data[ i ].thumb ) {

            linkSimilarSKU += '<span style="display: none;">' + data[ i ].link + '/p</span>';
            fotoSimilarSKU += '<img src="/arquivos/ids/' + data[ i ].foto + '-220-290" width="220" height="290" alt"" style="display: none;" />';
            nomeSimilarSKU += '<div style="display: none;">' + data[ i ].nome + '</div>';
            thumbSimilarSKU += '<li><img src="/arquivos/ids/' + data[ i ].thumb + '-12-12" width="12" height="12" alt"" /></li>';
        }
    }

    $target.find( '.colors ul' ).append( thumbSimilarSKU ).find( 'li' ).eq( 0 ).addClass( 'active' );
    $target.find( '.collection-image-link' ).append( fotoSimilarSKU );
    $target.find( '.collection-links' ).append( linkSimilarSKU );
    $target.find( '.collection-name' ).append( nomeSimilarSKU );

    // Adicionando classe de elemento ativo
    $target.addClass( PFTX.modules.similarProducts.similarClassActive );

    // funcao de troca os produtos
    PFTX.modules.similarProducts.bindEvents();
};


//
PFTX.modules.similarProducts.bindEvents = function() {

    $( '.' + PFTX.modules.similarProducts.similarClassActive ).find( '.colors li' ).live( 'mouseover', function() {

        var position = $( this ).index();
        var $target = $( this ).parent().parent().parent().parent();

        $target.find( '.colors ul' ).find( 'li' ).removeClass( 'active' ).eq( position ).addClass( 'active' );
        $target.find( '.collection-image-link' ).find( 'img' ).hide().eq( position ).show();
        $target.attr( 'href', $target.find( '.collection-links' ).find( 'span' ).hide().eq( position ).html() );
        $target.attr( 'title', $target.find( '.collection-name' ).find( 'div' ).eq( position ).html() );
        $target.find( '.collection-name' ).find( 'div' ).hide().eq( position ).show();
    });
};


// Inicia o modulo
PFTX.modules.similarProducts.init = function( $products ) {

    // Checar produtos com similar
    PFTX.modules.similarProducts.searchAvaliableProducts( $products, this.checkifAvaliable );
};


})( jQuery, window, document );