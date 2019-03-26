(function($, window, document, undefined) {

    'use strict';

    var modules = PFTX.modules;

    function loadMore(_config){
        this.config = {
            target: '#vitrineWrapper'
        };

        $.extend(this.config, _config);
    };

    var page = 1;

    loadMore.prototype.bindEvents = function() {
        var _that = this;
        $('body').on('click','#loadMore',function(){
            _that.requestHTML();
        });
    };

    loadMore.prototype.getUrl = function() {
        page++;
        if(document.location.search == '') {
            var url = document.location.href + "?PageNumber=" + page;
        }
        else {
            var url = document.location.href + "&PageNumber=" + page;
        }
        return url;
    }

    loadMore.prototype.createButton = function() {
        $(this.config.target).after('<div id="loadMore">Carregar mais produtos</div>');
    }

    loadMore.prototype.requestHTML = function() {
        $(this.config.target)
            .append('<div class="page"></div>');
        $('.page').last()
            .load(this.getUrl()+' .vitrine:not(resultItemsWrapper)',function(response, status, xhr){
                if(status != "success") {
                    page --;
                }
                if ( $(response).find('.busca-vazio').length > 0 ) {
                    $('#loadMore').fadeOut();
                }
            });
    }

    loadMore.prototype.init = function() {
        this.createButton();
        this.bindEvents();
    };

    modules.loadMore = loadMore;

})(jQuery, window, document);