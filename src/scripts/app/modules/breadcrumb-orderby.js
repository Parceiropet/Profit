(function ($, window, document, undefined) {
    'use strict';

    /**
     * module: PFTX.Modules, _app: construtor
     */
    var modules = PFTX.modules,
        _app;

    /**
     * class breadCrumb
     * @param _config
     */
    function breadCrumb (_config) {
        this.config = {
            maxWidth: 767,
            stand: '.prateleira',
            target: '.menu-main > .bread-crumb',
            targetChange: '.catalog-results',
            templateControls: '<div class="controls"><a role="button" class="list"><span class="ico-list-view"></span></a><a role="button" class="table active"><span class="ico-table-view"></span></a></div>',
            typeEvent: true
        };

        $.extend(this.config, _config);

        _app = this; //instance class

        if(_app.config.typeEvent) {
            _app.resizeEvent();
        }
    }

    /**
     * create buttons order by list our table
     * @returns {boolean}
     */
    breadCrumb.prototype.createButtons = function() {
        if($(_app.config.target).length == 0) {
            return false;
        }

        if(typeof this.config.templateControls === 'string') {
            var bread = $(_app.config.target).append(_app.config.templateControls),
                controls = bread.find('.controls a');

            if(controls.length == 0) {
                return false;
            } else {
                controls.each(function(index, value) {
                    _app.controlAction($(value), $('body').find(_app.config.targetChange));
                });

                _app.resizeElement($(_app.config.stand).find('ul > li'), true); //resize init
            }
        }
    };

    /**
     * action btn list our table, add class body and btn active
     * @param element
     * @returns {boolean}
     */
    breadCrumb.prototype.controlAction = function(element, products) {
        if(typeof element !== 'object' || products.length == 0) {
            return false;
        }

        //click control
        element.on('click', function(event) {
            event.preventDefault();

            if(_app.clearControls(element, products)) {
                products.addClass(element.attr('class'));
                element.addClass('active');
            }

            _app.resizeProductForBrother(767, $(_app.config.stand).find('ul > li'));
        });
    };

    /**
     * clear all class btn and body
     * @param element
     * @param products
     * @returns {boolean}
     */
    breadCrumb.prototype.clearControls = function(element, products) {
        if(typeof element !== 'object') {
            return false;
        }

        element.parent().find('a').each(function (indexLink, valueLink) {
            var link = $(valueLink);
            link.removeClass('active');

            if (products.hasClass(link.attr('class'))) {
                products.removeClass(link.attr('class'));
            }
        });

        return true;
    };

    /**
     * resize height for brother
     * @param size
     * @param target
     * @returns {boolean}
     */
    breadCrumb.prototype.resizeProductForBrother = function(size, target) {
        if(typeof size !== 'number') {
            return false;
        }

        if(_app.config.maxWidth <= size) {
            _app.resizeElement(target);
        }
    };

    /**
     * resize height element with animation
     * @param elements
     * @param resize
     * @returns {boolean}
     */
    breadCrumb.prototype.resizeElement = function(elements, resize) {
        if(typeof elements !== 'object') {
            return false;
        }

        if(elements.length > 0) {
            //event resize windows
            if(resize) {
                elements.height('auto');
                elements.height(_app.searchHeigthElement(elements));
                return true;
            }

            elements.height('auto');

            //finish animation for heigth has
            elements.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                function () {
                    elements.css({height: _app.searchHeigthElement(elements)});
                }
            );
        }
    };

    /**
     * search max heigth element
     * @returns {number}
     */
    breadCrumb.prototype.searchHeigthElement = function(elements) {
        if(typeof elements !== 'object') {
            return 'auto';
        }

        var heightMax = 0;

        elements.each(function(index, value) {
            var element = $(value);
            heightMax = element.height() > heightMax ? element.height() : heightMax;
        });

        return heightMax;
    };

    /**
     * resize windows
     * @returns {boolean}
     */
    breadCrumb.prototype.resizeEvent = function() {
        if(typeof _app.config.maxWidth !== 'number' && _app.config.maxWidth > 0)
            return false;

        if(_app.config.typeEvent) {
            var sizePage = function () {
                if(window.innerWidth <= _app.config.maxWidth) {
                    _app.resizeElement($(_app.config.stand).find('ul > li'), true);
                }
            };

            //event
            window.addEventListener('resize', sizePage);
        }
    };

    /**
     * init create buttons
     */
    breadCrumb.prototype.init = function () {
        this.createButtons();
    };

    //init
    modules.breadCrumb = breadCrumb;
})(jQuery, window, document);