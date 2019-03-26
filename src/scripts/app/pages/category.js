(function($, window, document, undefined) {

    'use strict';

    var pages = PFTX.pages,
        category = new PFTX.constructor.page('categoria');

    category.filtros = function(){
        $('.sub').eq(0).appendTo('.top-catalog');
    }
    category.DOMReady = function() {
        if (vtxctx.categoryName) {
           var htmlTitle = '<div class="top-catalog"><h2 class="title-department">' + vtxctx.departmentName + '</h2></div>';
           console.log(htmlTitle);
           $('.bread-crumb').after(htmlTitle);
           $('.title-category').css('opacity','1')
       }
       if (window.innerWidth <= 736) {
            $('.search-single-navigator').insertAfter('.filters');

            $('.departamento .search-single-navigator h3').click(function(event) {
                event.preventDefault();
                $(this).toggleClass('menu-is-visible');
              $('.departamento .search-single-navigator h4').toggleClass('toggle-visible');
            });
        }else{
            category.filtros();
            $('.top-catalog').eq(0).remove();
        }
    };

    category.ajaxStop = function() {

    };

    pages.category = category;

})(jQuery, window, document);
