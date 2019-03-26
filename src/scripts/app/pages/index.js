(function($, window, document, undefined) {

    'use strict';

    var pages = PFTX.pages,
        home = new PFTX.constructor.page('home');

    home.slideSlicks = function() {

        $('.top-banner__wrapper').slick({
            dots: true,
            infinite: true,
            arrows: true,
            speed: 2000,
            slidesToShow: 1,
            mobileFirst: true,
            autoplay: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: 'unslick'
                }
            ]
        });

        $('.main__brands-content').slick({
            slide: '.box-banner',
            arrows: true,
            slidesToShow: 7,
            slidesToScroll: 3,
            dots: false,
            infinite: true,
            variableWidth: false,
            responsive: [
                {
                breakpoint: 768,
                settings: {
                        arrows: false,
                        //centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 3,
                        slidesToScroll: 4,
                        swipeToSlide: true
                    }
                }
            ]
        });

        // $('.main__brands-content .slick-cloned').remove();

        $('.main__assinatura-shelf--animals ul').slick({
            slide: '.main__assinatura-shelf--animals ul li',
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            infinite: true,
            responsive: [
                {
                breakpoint: 768,
                settings: {
                        arrows: true,
                        dots: true,
                        slidesToShow: 2
                    }
                }
            ]
        });

        $('.main__shelf-wrapper ul').slick({
            slide: '.main__shelf-wrapper ul li',
            arrows: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            dots: false,
            infinite: true,
            responsive: [
                {
                breakpoint: 768,
                settings: {
                        arrows: true,
                        dots: true,
                        slidesToShow: 2
                    }
                }
            ]
        });

        if ($(window).width() < 768 ) {
            $('.main__assinatura-opcoes ul').slick({
                slide: '.main__assinatura-opcoes ul li',
                arrows: false,
                dots: false,
                // centerMode: true,
                infinite: false,
                variableWidth: true
                // centerPadding: '40px'
            });
            $('.main__shelf-list').slick({
                slide: '.main__shelf-list li',
                arrows: false,
                dots: false,
                // centerMode: true,
                infinite: false,
                variableWidth: true,
                slidesToShow: 3,
                slidesToScroll: 1
            });
        };
    }

    home.changeAnimal = function() {
        $('.main__assinatura-opcoes li').click(function() {
        	$('.main__assinatura-opcoes li').removeClass('active-animal');
        	$(this).addClass('active-animal');

        	var animal = $(this).attr('title').toLowerCase();
        	console.log(animal);

        	$('.content-animals').each( function() {
            if ( $(this).hasClass(animal)) {
        			$('.content-animals').removeClass('active-animal');
        			$(this).addClass('active-animal');
                }
            })

        });

        $('.main__shelf-list li').click(function() {
            $('.main__shelf-list li').removeClass('active-departament');
            $(this).addClass('active-departament');

            var departament = $(this).attr('title').toLowerCase();
            console.log(departament);

            $('.main__shelf-wrapper').each( function() {
            if ( $(this).hasClass(departament)) {
                    $('.main__shelf-wrapper').removeClass('active-departament');
                    $(this).addClass('active-departament');
                }
            })

        });
    }

    home.checkHTML = function() {

        PFTX.pages.common.mobileWidth = 736;
        window.isMobile = window.innerWidth <= PFTX.pages.common.mobileWidth;

        var html = $('.main__banner noscript').text();
        var htmlAssinatura = $('.main__assinatura noscript').text();
        if(window.isMobile) {
            html = $($(html)[1]).html();
            htmlAssinatura = $($(htmlAssinatura)[1]).html();
        }
        else {
            html = $($(html)[0]).html();
            htmlAssinatura = $($(htmlAssinatura)[0]).html();
        }
        $('.main__banner .u-center').html('<div class="top-banner__wrapper">'+html+'</div>');
        $('.main__assinatura-content--banner').html('<div class="top-banner__wrapper">'+htmlAssinatura+'</div>');
    }

    home.DOMReady = function() {

        home.checkHTML();

        home.changeAnimal();

        home.slideSlicks();

        window.addEventListener("resize", function() {
            console.log('oi')
            // home.slideSlicks();
            //


        });


    };

    home.ajaxStop = function() {

    };

    pages.home = home;

})(jQuery, window, document);
