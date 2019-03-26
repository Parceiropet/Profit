(function($, window, document, undefined){


    'use strict';

    var modules = PFTX.modules;

    function bannerHtml(_config){
        this.config = {
	        separator: '##',
	        target: null,
            autoplay: false,
            autoplaySpeed: 2000
        };

        $.extend(this.config, _config);
	}

    bannerHtml.prototype.buildHtml = function(){

    	var _that = this;

    	console.log(_that.config);

    	$(_that.config.target).find('.box-banner').each(function () {
    		var $current = $(this);
    		var content = $current.find('img').attr('alt');
    		console.log(_that.config);
    		console.log(_that.config.separator);
    		if(content.indexOf(_that.config.separator) > -1){
    			var title = content.split(_that.config.separator)[0];
    			var text = content.split(_that.config.separator)[1];
    			var html = [
    				'<div class="banner-html__background"></div>',
    				'<div class="banner-html__content">',
	    				'<h2 class="banner-html__title">',
	    					title,
	    				'</h2>',
	    				'<p class="banner-html__text">',
	    					text,
	    				'</p>',
	    				'<span class="banner-html__link">Ver mais</span>',
    				'</div>'
    			].join('');

    			$current.append(html);
    		}
    	})
    }

    bannerHtml.prototype.init = function(){
        var _that = this;
    	_that.buildHtml();

        if($(_that.config.target).find('.box-banner').length > 1) {
            $(_that.config.target).slick({
                dots: true,
                infinite: true,
                arrows: false,
                slide: '.box-banner',
                autoplay: _that.config.autoplay,
                autoplaySpeed: _that.config.autoplaySpeed
            });
        }
        else {
            $(this.config.target).addClass('no-slick');
        }
    };

    modules.bannerHtml = bannerHtml;

})(jQuery, window, document);
