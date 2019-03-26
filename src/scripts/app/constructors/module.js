(function($, window, document, undefined) {

    'use strict';

    PFTX.constructor = PFTX.constructor || {};

    // Class module onstructor
    PFTX.constructor.module = function(module) {
        //
    };

    // init
    PFTX.constructor.module.init = function(options) {

        for (var index in options) {
            if (PFTX.modules.buyButtonAsync.hasOwnProperty(index)) {
                PFTX.modules.buyButtonAsync[index] = options[index];
            }
        }
    };


    // Instanciondo um modulo
    /*#

        PFTX.modules.buyButtonAsync.init({
            $target: 0,
            floated: true
        });

        // xasxanlsx

        var buyButton = new PFTX.modules.buyButtonAsync();


        buyButton.init({
            x: 1,
            y: 1
        });
    */


})(jQuery, window, document);
