(function( $, window, document, undefined ) {

    'use strict';

    PFTX.pages.institucional = new PFTX.constructor.page( 'institucional' );

    PFTX.pages.institucional.controlAccordion = function(){
        var $accordions = $('.main-page__content .accordion');
        var $getHash = window.location.hash;
        // Accordion
        $accordions.each(function(){
            $(this).attr('rel', $(this).attr('id'));
            $(this).removeAttr('id');

            if($(this).find('.accordion-content').text() == ''){
                $(this).remove();
            }

            $(this).find('.accordion-control').click(function(){
                if($(this).parent().hasClass('opened')){
                    $(this).find('.fa')
                        .addClass('fa-angle-up')
                        .removeClass('fa-angle-down');
                    PFTX.pages.institucional.controlAccordion.closeAll();
                } else {
                    PFTX.pages.institucional.controlAccordion.closeAll();
                    $(this).parent().addClass('opened');
                    $(this).find('.fa')
                        .addClass('fa-angle-down')
                        .removeClass('fa-angle-up');
                    $(this).parent().find('.accordion-content').slideDown('fast');
                }
            });
        });

        // Abre accordion se já tiver hash
        if($getHash) {
            $getHash = $getHash.replace('#', '');
            if($('.accordion[rel="'+$getHash+'"]').length){
                $('.accordion.opened')
                    .removeClass('opened')
                    .find('.accordion-content')
                        .slideUp('fast');
                $('.accordion[rel="'+$getHash+'"]')
                    .addClass('opened')
                    .find('.accordion-content')
                        .slideDown('fast');
            }
        }
        if ($(window).width() < 640) {
            $('.accordion').removeClass('opened');
            $('.accordion .accordion-content').removeAttr('style');
        }

    };

    PFTX.pages.institucional.controlAccordion.closeAll = function(callback){
        var _callback = callback || function(){

        };

        if(!$('.accordion.opened').length){
            return _callback();
        }

        $('.accordion.opened').find('.accordion-content').slideUp('fast', _callback);
        $('.accordion.opened').removeClass('opened');

    }

    PFTX.pages.institucional.removeHashLinks = function () {
    $('.page-footer__item--link').click(function(){
    var hash = location.hash.replace('#','');
        if(hash != ''){
            location.hash = '';
        }
    });
    };

    PFTX.pages.institucional.DOMReady = function() {

         PFTX.pages.institucional.removeHashLinks();

        // Control Accordion
        PFTX.pages.institucional.controlAccordion();

        $(window).bind('hashchange', function(e){
            var $getHash = window.location.hash;
            var $accordions = $('.accordion[rel="'+$getHash.replace('#', '')+'"]');

            if($accordions.length){
                PFTX.pages.institucional.controlAccordion.closeAll(function(){
                    $('html, body').animate({
                        'scrollTop': $accordions.offset().top - 200
                    }, 300, function(){
                        $accordions.addClass('opened');
                        $accordions.find('.accordion-content').slideDown('fast');
                    });

                });
            };
        });

    };

})( jQuery, window, document );
