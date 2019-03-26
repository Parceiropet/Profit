(function( $, window, document, undefined ) {

'use strict';

PFTX.constructor = {};

// Class Page onstructor
PFTX.constructor.page = function( page ) {

    this.pageClass = page;

    this.DOMReady = function() {};
    this.winLoad = function() {};
    this.ajaxStop = function() {};
    this.common = function() {};

    this.init = function() {
        $( window ).load($.proxy(function() {
            this.winLoad();
        }, this));

        $( document )
        .ready($.proxy(function(){
            this.common();
            this.DOMReady();
        }, this))
        .ajaxStop($.proxy(function(){
            this.common();
            this.ajaxStop();
        }, this));
    };
};

})( jQuery, window, document );