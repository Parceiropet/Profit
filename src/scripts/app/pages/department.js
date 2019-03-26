(function( $, window, document, undefined ) {

    'use strict';

    PFTX.pages.department = new PFTX.constructor.page( 'departamento' );

    PFTX.pages.department.filtros = function(){
        $('.sub').eq(0).appendTo('.top-catalog');
    }
    PFTX.pages.department.DOMReady = function() {

        // catalog.createTitleCatalog(vtxctx.departmentNam);
        if (vtxctx.departmentName) {
            var htmlTitle = '<div class="top-catalog"><h2 class="title-department">' + vtxctx.departmentName + '</h2></div>';
            $('.bread-crumb').after(htmlTitle);
            $('.title-department').css('opacity','1')
        }

        if (window.innerWidth <= 736) {
            $('.search-single-navigator').insertAfter('.filters');

            $('.departamento .search-single-navigator h3').click(function(event) {
                event.preventDefault();
                $(this).toggleClass('menu-is-visible');
            	$('.departamento .search-single-navigator h4').toggleClass('toggle-visible');
            });
        }else{
            PFTX.pages.department.filtros();
            $('.top-catalog').eq(0).remove();
        }
    };

})( jQuery, window, document );
