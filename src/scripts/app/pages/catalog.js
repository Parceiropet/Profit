(function($, window, document, undefined) {

    'use strict';

    var catalog = new PFTX.constructor.page('catalog');

    catalog.smartResearch = function() {
        $(".menu-departamento input[type='checkbox']").vtexSmartResearch({
            filtersMenu: '.menu-departamento',
    		removeCounter: true,
    		emptySearchMsg: '<h3>Esta combinação de filtros não retornou nenhum resultado!</h3>',
    		elemLoading: '',
    		returnTopText: '',
    		callback: function(){$('.helperComplement').remove();}
        });
    };

    catalog.orderControl = function() {
        var search = window.location.search;
        $('.catalog-shelf__order-item:first-of-type .catalog-shelf__order-link').addClass('active');
        $('.catalog-shelf__order-link').each(function() {
            if (search.indexOf($(this).attr('href')) !== -1) {
                $('.catalog-shelf__order-link').removeClass('active');
                $(this).addClass('active');
            }
        });
        $('.catalog-shelf__order-link').on('click', function(e) {
            e.preventDefault();
            $('.catalog-shelf__order-link').removeClass('active');
            $(this).addClass('active');
            $('.orderBy').find('select').val($(this).attr('href')).trigger('change');
        });

        if (window.innerWidth < 768) {
            $('.mobile-buttons__ordenar').on('click', function(e) {
                e.preventDefault();
                $('.order-wrapper').addClass('active');
                $('.bg-overlay').fadeIn('slow');
            });
            $('.order-top__close').on('click', function(e) {
                e.preventDefault();
                $('.order-wrapper').removeClass('active');
                $('.bg-overlay').fadeOut('slow');
            })
        }
    };

    catalog.clearFilter = function() {
        $('.c-sidebar__limpar-filtros').on('click', function(e) {
            e.preventDefault();
            $('.search-multiple-navigator input').attr('checked', false).change();
        });
    };

    catalog.applyFilter = function() {
        $('.c-sidebar__aplicar-filtros').on('click', function(e) {
            e.preventDefault();
            $('.c-sidebar').removeClass('active');
            $('body').removeClass('sidebar-active');
            $('.bg-overlay').fadeOut('slow');
        });
    };

    catalog.mobileControls = function() {
        if (window.innerWidth < 768) {
            if (!$('body').find('.bg-overlay').length) {
                $('body').append('<div class="bg-overlay" style="display: none;"></div>');
            }

            $('.mobile-buttons__filtrar').on('click', function(e) {
                e.preventDefault();
                $('.c-sidebar').addClass('active');
                $('body').addClass('sidebar-active');
                $('.bg-overlay').fadeIn('slow');
            });

            $('.sidebar-top__close').on('click', function(e) {
                e.preventDefault();
                $('.c-sidebar').removeClass('active');
                $('body').removeClass('sidebar-active');
                $('.bg-overlay').fadeOut('slow');
            });

            $('.search-multiple-navigator').find('h5').on('click', function(e) {
                e.preventDefault();
                $(this).parent('fieldset').toggleClass('active');
            });

            $('.c-sidebar').on('click', '.sidebar-top__title', function(e) {
                e.preventDefault();

                if ($('.c-sidebar.active').length > 0) {
                    $('.c-sidebar.active').removeClass('active');
                } else {
                    $('.c-sidebar').addClass('active');
                    $('html').removeClass('menu-active');
                }
            });

            // Fecha o filtro no mobile
            $('.filter').on('click', '.goBack', function(e) {
                e.preventDefault();

                if ($('.search-single-navigator ul.active').length > 0) {
                    $('.search-single-navigator ul.active').removeClass('active');
                    setTimeout(function() {
                        $('.search-single-navigator ul').hide();
                    }, 300)
                } else {
                    $(this).parents('.filter').removeClass('active');
                    $('html').removeClass('menu-active');
                }
            });

            // clona e insere o search-single-navigator no mobile
            $('.search-single-navigator').clone().addClass('navigator-mobile').append('.filters-mobile-title');

            $('.filters-mobile-title').click(function() {
                $('.search-single-navigator').toggleClass('category-active');
            });
        }
    };

    catalog.filterMobile = function() {

        if (window.innerWidth < 768) {
            // Verifica quantos filtros já foram aplicados desde o departamento origem
            var depth = location.pathname.split('/').length - 2;
            $('.filters__button').last().attr('data-filters', depth);

            // Marca o filtro de Ordenar Por, conforme estado atual da página
            var order = 'OrderByTopSaleDESC';

            if (location.search.indexOf('O=') >= 0) {
                order = location.search.split('O=').reverse()[0].split('&')[0];
            }

            $('.filters__orderby--item').removeClass('active');
            $('.filters__orderby--list a[href="' + order + '"]').parent().addClass('active');

            $('.filters__orderby--list a').on('click', function(e) {
                e.preventDefault();

                var urlParam = function(name) {
                    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
                    if (results == null) {
                        return null;
                    } else {
                        return decodeURI(results[1]) || 0;
                    }
                }

                var url = location.href;

                if (location.search !== "" && location.search.indexOf('O=') < 0) {
                    url += '&O=' + $(this).attr('href');
                } else if (location.search.indexOf('O=') >= 0) {
                    url = url.replace(urlParam('O'), $(this).attr('href'));
                } else {
                    url += '?O=' + $(this).attr('href');
                }

                location.href = url;
            });

            $('.filters__button').on('click', function(e) {
                e.preventDefault();

                var i = $(this).index();

                if (i === 0) {
                    $($('.c-sidebar')).addClass('active');
                    $('html').addClass('menu-active');
                } else {

                    $($('.filter')).addClass('active');
                    $('html').addClass('menu-active');
                }
            });
        }
    }

    catalog.DOMReady = function() {

        // catalog.linksSubCat();
        $(".menu-departamento input[type='checkbox']").vtexSmartResearch({
            filtersMenu: '.menu-departamento',
            loadContent: ".prateleira-assinatura[id^=ResultItems]",
            shelfClass: ".prateleira-assinatura",
    		removeCounter: true,
    		emptySearchMsg: '<h3>Esta combinação de filtros não retornou nenhum resultado!</h3>',
    		elemLoading: '',
    		returnTopText: '',
    		callback: function(){$('.helperComplement').remove();}
        });

        catalog.orderControl();
        catalog.mobileControls();
        catalog.applyFilter();
        catalog.clearFilter();

        if($('.filtro_marca').height() > 235){
            $('.filtro_marca').addClass('see-more').append("<button class='load-more'>veja mais +</button>");
        }

        $(document).ajaxComplete(function() {
            $('.helperComplement').remove();
        });

        $('.menu-departamento .search-single-navigator fieldset').first().addClass('active');

        catalog.filterMobile();

        $('.load-more').on('click', function(evt){
            evt.preventDefault();

            $(this).parent('.see-more').addClass('active');
        });

    };

    catalog.ajaxStop = function() {
        $('.helperComplement').remove();

        setTimeout(function() {
            $('.helperComplement').remove();
        }, 900);
    };


    PFTX.pages.catalog = catalog;

})(jQuery, window, document);
