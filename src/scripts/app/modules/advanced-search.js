(function( $, window, document, undefined ) {

'use strict';

PFTX.modules.advancedSearch = {
    $categoria: $( '#busca-categoria' ), // select de categorias
    $subcategoria: $( '#busca-peca' ), // select de subcategorias
    $filtros: $( '#busca-marca' ), // select de filtros
    $btnSubmit: $( '.filter-item.send .btn-filter' ) // btn submit
};

// funcao responsavel por atribuir eventos no select de categoria
// responsavel tbm por trazer os filtros a partir da categoria selecionada
PFTX.modules.advancedSearch.bindCategory = function() {

    // change do select de categoria
    // a partir desse resultado, monto subcategoria e filtros
    PFTX.modules.advancedSearch.$categoria.live( 'change', function() {

        // faco uma requisicao na pagina da categoria
        // assim busco suas subcategorias e monto a informacao necessaria

        // Populando os campos de [ subcategoria ]
        PFTX.modules.advancedSearch.$subcategoria.html( '<option value="">Carregando...</option>' );
        // Populando os campos de [ filtros ]
        PFTX.modules.advancedSearch.$filtros.html( '<option value="">Carregando...</option>' );

        if ( $( this ).val() ) {
            $.ajax({
                url: $( this ).val(),
                dataType: 'html',
                success: function( data ) {
                    PFTX.modules.advancedSearch.buildSubCategory( $( data ).find( '.menu-departamento' ).last() );
                }
            });
        } // if
    });
};

// funcao responsavel por montar os selects de subcategoria e filtros
PFTX.modules.advancedSearch.buildSubCategory = function( $elements ) {

    // pego as subcategorias e filtros para montar o restante do filtro
    var $subcategorias = $elements.find( 'h4 + ul' ).find( 'li' ),
        subcategoriasContent = '',
        $filtroMarcas = $elements.find( '.Marca' ).find( 'li' ),
        filtroMarcasContent = '';

    $subcategorias.each(function() {

        // pego o valor do link e faco um tratamento pra unir com o filtro
        var newValue = $( this ).find( 'a' ).attr( 'href' );
        newValue = newValue.split( 'pecas/' )[ 1 ].split( '?PS' )[ 0 ];
        subcategoriasContent += '<option value="' + newValue + '">' + $( this ).find( 'a' ).html() + '</option>';
    });

    $filtroMarcas.each(function() {

        // pego o valor do link e faco um tratamento pra unir com a subcategoria
        var newValue = $( this ).find( 'a' ).attr( 'href' );
        newValue = newValue.split( 'pecas/' )[ 1 ].split( '?PS' )[ 0 ];
        filtroMarcasContent += '<option value="' + newValue + '">' + $( this ).find( 'a' ).html() + '</option>';
    });

    // Populando os campos de [ subcategoria ]
    PFTX.modules.advancedSearch.$subcategoria.html( '<option value="">Selecione uma peça</option>' + subcategoriasContent );
    // Populando os campos de [ filtros ]
    PFTX.modules.advancedSearch.$filtros.html( '<option value="">Selecione uma marca</option>' + filtroMarcasContent );
};

// Funcao que monta url final
PFTX.modules.advancedSearch.getUrlResult = function() {

    var filterURL = '/pecas';
    // so acrescento valor de subcategoria se existir um valor escolhido
    if ( PFTX.modules.advancedSearch.$subcategoria.val() ) {
        filterURL += '/' + PFTX.modules.advancedSearch.$subcategoria.val();

        // so acrescento valor de filtro se existir um valor escolhido
        if ( PFTX.modules.advancedSearch.$filtros.val() ) {
            filterURL += '/' + PFTX.modules.advancedSearch.$filtros.val().split( '/' )[ 1 ];
        }
    } else {
        // so acrescento valor de filtro se existir um valor escolhido
        if ( PFTX.modules.advancedSearch.$filtros.val() ) {
            filterURL += '/' + PFTX.modules.advancedSearch.$filtros.val();
        } else {
            // retorno indisponivel
            filterURL = false;
        }
    }

    return filterURL;
};

// leva o usuario para a pagina do resultado
PFTX.modules.advancedSearch.sendUrlResult = function() {

    // envia o form
    var url = PFTX.modules.advancedSearch.getUrlResult();


    PFTX.modules.advancedSearch.$btnSubmit.live( 'click', function( evt ) {
        evt.preventDefault();

        // se o valor for valido
        if ( url ) {

            url = window.location.origin + PFTX.modules.advancedSearch.getUrlResult();
            // console.log('url: ' + url);

            window.location.href = url;
            // $.ajax({
            //     url: url,
            //     dataType: 'html',
            //     success: function(data) {
            //         // var dataHTML = $(data);
            //         // if (dataHTML.find('li').length > 0) {
            //         // } else {
            //         //     $('.buscaBtn').text('Nenhum Resultado');
            //         //     window.setTimeout(function() {
            //         //         // $('.buscaBtn').text(btnText);
            //         //     }, 3000);
            //         // }
            //     }
            // });
        }
    });
}


// Inicia o modulo
PFTX.modules.advancedSearch.init = function() {

    // Montando select de departamento
    PFTX.modules.advancedSearch.bindCategory();

    // submit
    PFTX.modules.advancedSearch.sendUrlResult();
};

})( jQuery, window, document );