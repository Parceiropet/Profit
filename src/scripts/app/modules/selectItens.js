(function($, window, document, undefined) {

    'use strict';

    PFTX.modules.cookie = window.PFTX.modules.cookie || {};

    PFTX.modules.cookie.getItens = function(elementHtml, classActive, elementThis) {
        $(elementHtml).click(function() {
            $(elementHtml).removeClass(classActive);
            $(this).addClass(classActive);

            var animal = $(this).attr('title').toLowerCase();
            console.log(animal);

            $(elementThis).each( function() {
            if ( $(this).hasClass(animal)) {
                    $(elementThis).removeClass(classActive);
                    $(this).addClass(classActive);
                }
            })
        });
    };

})(jQuery, window, document);
