(function ($, window, document, undefined) {
    'use strict';

    /**
     * module: PFTX.Modules, _app: construtor
     */
    var modules = PFTX.modules,
        _app;

    /**
     * class filters mobile
     * @param _config
     */
    function filtersMobile(_config) {
        this.config = {
            btnCollapse: 'fieldset',
            parent: '.menu-departamento .search-multiple-navigator',
            btnClear: '.controls-close',
            navigator: '.search-multiple-navigator',
            navigationNav: '.navigation-tabs',
            templateClose: '<div class="controls-close"><button>limpar filtros</button></div>', //bottom close
            templateButtons: '<div class="title-filters"><h2>Filtros <span class="ico-close"></span></h2></div>',
            templateItemSingleNav: '<fieldset class=""><h5 class="{class}">{name}</h5><div class="items">{items}</div></fieldset>',
            templateItemSingleNavLink: '<a class href="{link}">{name}</a>'
        };

        $.extend(this.config, _config);

        _app = this; //instance class
    }

    /**
     * create template
     */
    filtersMobile.prototype.createTemplate = function() {
        if($(_app.config.parent).length == 0) {
            console.warn('Not find multiple content.');
            return false;
        }

        //add btn close
        if(_app.config.parent.search(/(.search-multiple-navigator)/g) != -1) {
            $(_app.config.parent).parent().parent().find('> div').prepend(_app.config.templateButtons);

            _app.btnCheck($(_app.config.parent)); //check
        } else {
            $(_app.config.parent).prepend(_app.config.templateButtons);

            if(!$('body').hasClass('busca')) {
                //remove event click a
                $(_app.config.parent).find(_app.config.btnCollapse).each(function(index, value) {
                    var element = $(value);

                    element.find('a').attr('href', '#').unbind('click');
                });
            } else {
                //list type collection
                _app.collectionFilters();
            }
        }

        _app.btnCollapse();
        _app.openPanel(); //event click button open panel
    };

    /**
     * buttons collapse
     */
    filtersMobile.prototype.btnCollapse = function() {
        //group event
        $(_app.config.parent).find(_app.config.btnCollapse).on('click', function() {
            var element = $(this);

            if(element.hasClass('active')) {
                element.removeClass('active');
                return;
            }

            element.addClass('active');
        });
    },

    /**
     * btn check elements
     * @param elements
     * @returns {boolean}
     */
    filtersMobile.prototype.btnCheck = function(elements) {
        if(typeof elements !== 'object') {
            return false;
        }

        elements.find('div > label').on('click', function () {
            var checkedInput = $(this);

            if (checkedInput.find('> input').is(':checked')) {
                checkedInput.addClass('active');
                return;
            }

            checkedInput.removeClass('active');
            _app.checkboxFilter($(_app.config.parent)); //checkbox active
        });
    };

    /**
     * close panel
     */
    filtersMobile.prototype.closePanel = function() {
        $('.title-filters > h2 span').on('click', function() {
            if($(_app.config.navigationNav).hasClass('active')) {
                $('body').removeClass('open-filters');
                $(_app.config.navigationNav).removeClass('active');

                _app.closeClearFilters();
            }
        });
    };

    /**
     * checkbox clear our open
     * @param parent
     * @returns {boolean}
     */
    filtersMobile.prototype.checkboxFilter = function(parent) {
        if(typeof parent !== 'object') {
            return false;
        }

        setTimeout(function() {
            if(parent.find('div').find('input[type="checkbox"]').is(':checked')) {
                _app.openClearFilters();
                return;
            }

            _app.closeClearFilters();
        }, 100);
    };

    /**
     * open panel
     * @returns {boolean}
     */
    filtersMobile.prototype.openPanel = function() {
        if($('.btn-filters').length == 0) {
            return false;
        }

        //btn filters
        $('.btn-filters').on('click', function () {
            $('body').addClass('open-filters');
            $(_app.config.navigationNav).addClass('active');

            if ($(_app.config.parent).find('input[type="checkbox"]').is(':checked')) {
                _app.openClearFilters();
            }
        });

        _app.closePanel(); //close panel
    };

    /**
     * open clear filters btn bottom screen
     */
    filtersMobile.prototype.openClearFilters = function() {
        if($('body').find('.controls-close').length == 0) {
            $(_app.config.navigator).addClass('open-filters').append(_app.config.templateClose);

            //btn clear inputs checkbox
            _app.clearFilters($(_app.config.btnClear));
        }
    };

    /**
     * clear filters
     * @param element
     * @returns {boolean}
     */
    filtersMobile.prototype.clearFilters = function(element) {
        if(typeof element !== 'object') {
            return false;
        }

        //animate
        element.animate({bottom: 0}, 300, function() {
            $(this).find('button').off('click').on('click', function() {
                //check
                $(_app.config.parent).find('input[type="checkbox"]').each(function(index, value) {
                    // $(value)[0].checked = false;
                    // console.log($(value).is( ":checked" ));
                    $(value).parent().removeClass('active');
                });
                $('.search-multiple-navigator input').attr('checked', false).change();

                // $(_app.config.parent).find('input[type="checkbox"]').first().change();

                //close clear filters
                _app.closeClearFilters();
            });
        });
    };

    /**
     * close clear filters
     */
    filtersMobile.prototype.closeClearFilters = function() {
        if($('body').find(_app.config.btnClear).length > 0) {
            //animate
            $(_app.config.btnClear).animate({ bottom: -90}, 400, function() {
                $(_app.config.navigator).removeClass('open-filters');
                $(this).remove();
            });
        }
    };

    /**
     * collection filters, in search or collection
     */
    filtersMobile.prototype.collectionFilters = function() {
        var content = $('.menu-main .menu-departamento .search-single-navigator');

        if(content.length > 0) {
            $('.menu-main .navigation').addClass('navigation-tabs').removeClass('navigation');

            $('.menu-main .menu-departamento .search-single-navigator').remove();
            $('.menu-main .menu-departamento').append('<div></div>');
            $('.menu-main .menu-departamento').find('> div').append('<div class="title-filters"><h2>Filtros <span class="ico-close"></span></h2></div>');
            $('.menu-main .menu-departamento').find('> div').append('<div class="search-multiple-navigator" style="display: none;"></div>');

            _app.colletionCreateFilters(content);
        } else {
            console.log('SingleNavigator! Pleae checked your component vtex Navigator!');
        }
    };

    /**
     * create items filter in this case links
     * @param content
     * @returns {boolean}
     */
    filtersMobile.prototype.colletionCreateFilters = function(content) {
        if(!content || content.find('> h3').length == 0)
            return false;

        content.find('> h3').each(function(index, value) {
            var element = $(value),
                elementFieldset = _app.config.templateItemSingleNav;

            if (element.find('> ul > li').length == 0) {
                var link = _app.config.templateItemSingleNavLink
                    .replace('{name}', element.find('> a').text())
                    .replace('{link}', element.find('> a').attr('href'));

                elementFieldset = elementFieldset.replace('{class}', 'link').replace('{name}', link);
            } else {
                var items = '';

                elementFieldset = elementFieldset
                    .replace('{class}', '')
                    .replace('{name}', element.find('> a').text());

                element.find('> ul > li').each(function(indexElem, elem) {
                    items = items + $(elem)[0].innerHTML;
                });

                elementFieldset = elementFieldset.replace('{items}', items);
            }

            $('.search-multiple-navigator').append(elementFieldset);

            //event open submenu
            $.each($('.search-multiple-navigator').find('fieldset'), function(indexItem, item) {
                $(item).find('> h5').off('click').on('click', function() {
                    $(this).parent().toggleClass('active');
                });
            });
        });

        $(_app.config.parent).parent().parent().find('div').prepend(_app.config.templateButtons);
        _app.btnCheck($(_app.config.parent)); //check
    };

    /**
     * init create buttons
     */
    filtersMobile.prototype.init = function () {
        if(_app.getScreenWidth() < 768) {
            this.createTemplate();
        }
    };

    /**
     * get screen width
     * @returns {int}
     */
    filtersMobile.prototype.getScreenWidth = function () {
        var de = document.body.parentNode,
            db = document.body;

        if (window.opera) return db.clientWidth;
        if (document.compatMode == 'CSS1Compat') return de.clientWidth;
        else return db.clientWidth;
    };

    //init
    modules.filtersMobile = filtersMobile;

})(jQuery, window, document);
